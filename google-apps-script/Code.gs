// Configuration
const SHEET_NAME = 'Repair Bookings';
const HEADERS = ['Timestamp', 'Name', 'Email', 'Phone', 'Date', 'Time', 'Status', 'Timezone'];
const TIMEZONE = 'Europe/Bucharest';

// Initialize the sheet if it doesn't exist
function initializeSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
    
    // Format header row
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setBackground('#f3f3f3')
               .setFontWeight('bold')
               .setHorizontalAlignment('center');
    
    // Set column widths
    sheet.setColumnWidths(1, HEADERS.length, 150);
  }
  
  return sheet;
}

// Convert time to Bucharest timezone
function convertToBucharestTime(date, time) {
  const [timeStr, period] = time.split(' ');
  let [hours, minutes] = timeStr.split(':').map(Number);
  
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  
  const dateTime = new Date(date);
  dateTime.setHours(hours, minutes);
  
  // Convert to Bucharest time
  const bucharestTime = Utilities.formatDate(dateTime, TIMEZONE, 'HH:mm');
  return bucharestTime;
}

// Check for duplicate bookings
function isDuplicateBooking(sheet, date, time) {
  const data = sheet.getDataRange().getValues();
  const dateCol = HEADERS.indexOf('Date') + 1;
  const timeCol = HEADERS.indexOf('Time') + 1;
  
  // Convert input time to Bucharest time
  const bucharestTime = convertToBucharestTime(date, time);
  
  // Skip header row
  for (let i = 1; i < data.length; i++) {
    const existingTime = convertToBucharestTime(data[i][dateCol - 1], data[i][timeCol - 1]);
    if (data[i][dateCol - 1] === date && existingTime === bucharestTime) {
      return true;
    }
  }
  return false;
}

// Sort sheet by date
function sortSheetByDate(sheet) {
  const dateCol = HEADERS.indexOf('Date') + 1;
  const lastRow = sheet.getLastRow();
  
  if (lastRow > 1) {
    const range = sheet.getRange(2, 1, lastRow - 1, HEADERS.length);
    range.sort({column: dateCol, ascending: true});
  }
}

// Handle form submission
function doPost(e) {
  try {
    // Parse the form data
    const formData = JSON.parse(e.postData.contents);
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time) {
      return ContentService.createTextOutput(JSON.stringify({
        error: 'missing_fields',
        message: 'All fields are required'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Initialize sheet
    const sheet = initializeSheet();
    
    // Check for duplicate booking
    if (isDuplicateBooking(sheet, formData.date, formData.time)) {
      return ContentService.createTextOutput(JSON.stringify({
        error: 'duplicate_booking',
        message: 'This time slot is already booked'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Prepare row data
    const timestamp = new Date().toISOString();
    const rowData = [
      timestamp,
      formData.name,
      formData.email,
      formData.phone,
      formData.date,
      formData.time,
      'Pending', // Initial status
      TIMEZONE // Store the timezone
    ];
    
    // Append the new booking
    sheet.appendRow(rowData);
    
    // Sort the sheet by date
    sortSheetByDate(sheet);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Booking added successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      error: 'server_error',
      message: 'Error processing booking',
      details: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (for testing)
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    message: 'This endpoint only accepts POST requests'
  })).setMimeType(ContentService.MimeType.JSON);
} 