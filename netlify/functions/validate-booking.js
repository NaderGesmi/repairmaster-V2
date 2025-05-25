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
    if (!date || !time) {
      return {
        error: 'validation_error',
        message: 'Date and time are required',
        details: 'Missing date or time parameter'
      }
    }

    // Parse the date string into a Date object
    let bookingDate
    try {
      bookingDate = parseISO(date)
      if (isNaN(bookingDate.getTime())) {
        throw new Error('Invalid date format')
      }
    } catch (error) {
      return {
        error: 'validation_error',
        message: 'Invalid date format',
        details: error.message
      }
    }

    // Convert time to 24-hour format
    let hours, minutes
    try {
      const result = convertTo24Hour(time)
      hours = result.hours
      minutes = result.minutes
    } catch (error) {
      return {
        error: 'validation_error',
        message: 'Invalid time format',
        details: error.message
      }
    }
    
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
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  }

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    }
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const data = JSON.parse(event.body)
    const { bookingTime, cost } = data

    // Debug logs
    console.log('Received bookingTime:', bookingTime)
    const parsedTime = new Date(bookingTime)
    console.log('Parsed time:', parsedTime)
    console.log('Received cost:', cost, 'Type:', typeof cost)

    // Validate bookingTime
    if (!bookingTime || isNaN(parsedTime.getTime())) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'validation_error',
          message: 'Invalid booking time format. Use ISO string.'
        })
      }
    }

    // Validate cost
    if (typeof cost !== 'number' || cost <= 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'validation_error',
          message: 'Invalid cost. Must be a positive number.'
        })
      }
    }

    // Convert to timezone (e.g., Europe/Bucharest)
    const zonedTime = utcToZonedTime(parsedTime, TIMEZONE)

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, zonedTime })
    }
  } catch (error) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        error: 'validation_error',
        message: error.message
      })
    }
  }
} 