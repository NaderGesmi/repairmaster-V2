const fetch = require('node-fetch')

const TIMEZONE = 'Europe/Bucharest'
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL // Add this to your Netlify environment variables

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
    const { date, time } = data

    // Debug logs
    console.log('Received date:', date)
    console.log('Received time:', time)

    // Combine date + time into a Date object
    const bookingDateTime = new Date(`${date}T${time}:00`)
    console.log('Parsed bookingDateTime (Local Server Time):', bookingDateTime)

    // Validate date and time
    if (isNaN(bookingDateTime.getTime())) {
      throw new Error("Invalid date or time format.")
    }

    // Validate time slot (e.g., 9 AM - 5 PM local server time)
    const hours = bookingDateTime.getHours()
    if (hours < 9 || hours >= 17) {
      throw new Error("Time slot must be between 09:00 and 17:00 local server time.")
    }

    // Optional: Add a check for past dates
    const now = new Date()
    if (bookingDateTime < now) {
       throw new Error("Cannot book appointments in the past.");
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: "Booking time is valid." })
    }
  } catch (error) {
    console.error('Validation error:', error)
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