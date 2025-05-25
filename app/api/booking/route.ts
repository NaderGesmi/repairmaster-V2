import { NextResponse } from 'next/server'

interface BookingData {
    name: string
    phone: string
    service: string
    address: string
    datetime: string // Expecting ISO string from frontend
    notes?: string
    addressType: 'auto' | 'manual'
}

// Replace with your actual Google Apps Script deployment URL
const GOOGLE_SHEET_APP_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw8GDMa1iG_mt897bypMXk-8wAjBAR6zgBTjlgXR_e2EtPS4n5_pVcmVPifiHmdtg_z_Q/exec';

export async function POST(request: Request) {
    try {
        const data = await request.json() as BookingData
        console.log('Received booking data:', data);

        // Validate required fields
        const requiredFields = ['name', 'phone', 'service', 'address', 'datetime']
        const missingFields = requiredFields.filter(field => !data[field])

        if (missingFields.length > 0) {
            console.error('Missing required fields:', missingFields);
            return NextResponse.json(
                { error: `Missing required fields: ${missingFields.join(', ')}` },
                { status: 400 }
            )
        }

        // Validate phone number format (basic validation)
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
        if (!phoneRegex.test(data.phone)) {
            console.error('Invalid phone number format:', data.phone);
            return NextResponse.json(
                { error: 'Invalid phone number format' },
                { status: 400 }
            )
        }

        // Validate datetime (must be in the future) - server-side check
        const bookingDate = new Date(data.datetime)
        const now = new Date()
        if (bookingDate < now) {
            console.error('Booking date must be in the future:', data.datetime);
            return NextResponse.json(
                { error: 'Booking date must be in the future' },
                { status: 400 }
            )
        }

        // Prepare data for Google Apps Script (send only relevant fields)
        const scriptData = {
            name: data.name,
            phone: data.phone,
            service: data.service,
            address: data.address,
            datetime: data.datetime, // Send ISO string
            notes: data.notes || ''
        };

        // Construct URL with query parameters
        const queryParams = new URLSearchParams(scriptData as any).toString();
        const scriptUrl = `${GOOGLE_SHEET_APP_SCRIPT_URL}?${queryParams}`;
        console.log('Google Apps Script URL:', scriptUrl);

        // Send data to Google Apps Script using GET request
        const scriptResponse = await fetch(scriptUrl, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Check response from Apps Script
        if (!scriptResponse.ok) {
            console.error('Error sending data to Google Sheet:', scriptResponse.status, scriptResponse.statusText);
            try {
                const errorBody = await scriptResponse.json();
                console.error('Google Sheet Script Error Body:', errorBody);
                return NextResponse.json(
                    { error: errorBody.message || 'Failed to send data to Google Sheet' },
                    { status: 500 }
                );
            } catch (parseError) {
                console.error('Failed to parse Google Sheet script error response:', parseError);
                return NextResponse.json(
                    { error: 'Failed to send data to Google Sheet and could not parse script response.' },
                    { status: 500 }
                );
            }
        }

        const scriptResult = await scriptResponse.json();
        console.log('Google Apps Script response:', scriptResult);

        if (scriptResult.status === 'success') {
            return NextResponse.json({
                success: true,
                message: scriptResult.message || 'Booking received and sent to Google Sheet successfully'
            });
        } else {
            console.error('Google Sheet Script reported an error:', scriptResult.message);
            return NextResponse.json(
                { error: scriptResult.message || 'Google Sheet script failed to process data' },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error('Error processing form submission or sending to Google Sheet:', error);
        if (error instanceof Error) {
            console.error('Error stack:', error.stack);
        }
        return NextResponse.json(
            { error: 'Failed to process form submission' },
            { status: 500 }
        )
    }
} 