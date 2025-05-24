require('tr46');
require('whatwg-url');

const { format, isBefore, isAfter, setHours, setMinutes, isWeekend, parseISO } = require('date-fns')
const { zonedTimeToUtc, utcToZonedTime, formatInTimeZone } = require('date-fns-tz')
const fetch = require('node-fetch')

const TIMEZONE = 'Europe/Bucharest'
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL // Add this to your Netlify environment variables

// Convert 12-hour time to 24-hour format
function convertTo24Hour(time) {
  const [timeStr, period] = time.split(' ')
  let [hours, minutes] = timeStr.split(':').map(Number)
  
  if (period === 'PM' && hours !== 12) hours += 12
  if (period === 'AM' && hours === 12) hours = 0
  
  return { hours, minutes }
}

// Format time in Bucharest timezone
function formatTimeInBucharest(date) {
  return formatInTimeZone(date, TIMEZONE, 'HH:mm')
}

// Validate booking time slot
function validateTimeSlot(date, time) {
  try {
    // Parse the date and convert time to 24-hour format
    const bookingDate = parseISO(date)
    const { hours, minutes } = convertTo24Hour(time)
    
    // Create date object in user's timezone
    const selectedDateTime = setMinutes(setHours(bookingDate, hours), minutes)
    
    // Convert to Bucharest timezone
    const zonedDateTime = utcToZonedTime(selectedDateTime, TIMEZONE)
    
    // Get current time in Bucharest
    const now = utcToZonedTime(new Date(), TIMEZONE)
    
    // Check if booking is in the past
    if (isBefore(zonedDateTime, now)) {
      return {
        error: 'past_booking',
        message: 'Cannot book appointments in the past',
        details: {
          selected: formatTimeInBucharest(zonedDateTime),
          current: formatTimeInBucharest(now)
        }
      }
    }
    
    // Get hours in Bucharest timezone
    const bucharestHours = zonedDateTime.getHours()
    
    // Check weekday vs weekend hours
    if (isWeekend(zonedDateTime)) {
      // Weekend hours: 08:00-23:00
      if (bucharestHours < 8 || bucharestHours >= 23) {
        return {
          error: 'invalid_time_slot',
          message: 'Weekend hours are 08:00-23:00',
          details: {
            selected: formatTimeInBucharest(zonedDateTime),
            allowed: '08:00-23:00'
          }
        }
      }
    } else {
      // Weekday hours: 18:00-23:00
      if (bucharestHours < 18 || bucharestHours >= 23) {
        return {
          error: 'invalid_time_slot',
          message: 'Weekday hours are 18:00-23:00',
          details: {
            selected: formatTimeInBucharest(zonedDateTime),
            allowed: '18:00-23:00'
          }
        }
      }
    }
    
    return null
  } catch (error) {
    return {
      error: 'validation_error',
      message: 'Error validating time slot',
      details: error.message
    }
  }
}

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    // Parse the request body
    const data = JSON.parse(event.body)
    
    // Check if this is a booking form submission
    if (data['form-name'] !== 'booking') {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid form name' })
      }
    }
    
    // Validate required fields
    if (!data.date || !data.time || !data.name || !data.email || !data.phone) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: 'missing_fields',
          message: 'All fields are required'
        })
      }
    }
    
    // Validate the time slot
    const validationError = validateTimeSlot(data.date, data.time)
    
    if (validationError) {
      return {
        statusCode: 400,
        body: JSON.stringify(validationError)
      }
    }

    // Forward to Google Apps Script
    const scriptResponse = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        date: data.date,
        time: data.time
      })
    })

    const scriptResult = await scriptResponse.json()

    if (!scriptResponse.ok) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'booking_failed',
          message: scriptResult.message || 'Failed to save booking'
        })
      }
    }
    
    // If everything passes, return success
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        message: 'Booking confirmed successfully'
      })
    }
    
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'server_error',
        message: 'Internal server error',
        details: error.message
      })
    }
  }
} 