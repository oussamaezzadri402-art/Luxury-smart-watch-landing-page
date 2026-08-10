export interface GoogleSheetsOrderPayload {
  timestamp?: string;
  selectedWatch: string;
  price: number | string;
  customerName?: string;
  phoneNumber?: string;
  city?: string;
  address?: string;
  quantity?: number;
  note?: string;
  source?: string;
}

/**
 * Sends order information asynchronously to Google Sheets via a Google Apps Script Web App URL.
 * Designed to fail gracefully without blocking the user experience or WhatsApp redirect.
 */
export async function sendOrderToGoogleSheets(
  payload: GoogleSheetsOrderPayload
): Promise<{ success: boolean; reason?: string }> {
  const webAppUrl = import.meta.env.VITE_GOOGLE_SHEETS_WEB_APP_URL;

  if (!webAppUrl || webAppUrl === 'YOUR_GOOGLE_SHEETS_WEB_APP_URL_HERE') {
    console.info(
      '[Google Sheets] VITE_GOOGLE_SHEETS_WEB_APP_URL is not configured. Order log skipped.'
    );
    return { success: false, reason: 'not_configured' };
  }

  const formattedData = {
    timestamp: payload.timestamp || new Date().toISOString(),
    selectedWatch: payload.selectedWatch,
    price: payload.price,
    customerName: payload.customerName || 'N/A',
    phoneNumber: payload.phoneNumber || 'N/A',
    city: payload.city || 'N/A',
    address: payload.address || 'N/A',
    quantity: payload.quantity || 1,
    note: payload.note || '',
    source: payload.source || 'website'
  };

  try {
    // mode: 'no-cors' allows posting to Google Apps Script Web App without CORS blocks
    await fetch(webAppUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formattedData)
    });

    console.info('[Google Sheets] Order sent successfully to endpoint.');
    return { success: true };
  } catch (error) {
    console.warn('[Google Sheets] Failed to send order to endpoint:', error);
    // Return false without throwing so main app flow is never interrupted
    return { success: false, reason: 'network_error' };
  }
}
