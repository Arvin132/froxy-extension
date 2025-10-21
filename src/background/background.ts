chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GET_WHATSAPP_MESSAGES') {
    getWhatsAppMessages()
      .then((result) => sendResponse(result))
      .catch((error) => sendResponse({ success: false, error: error.message }));
    
    return true; // Keep the message channel open
  }
});

/**
 * Extract messages from WhatsApp Web tab
 * Returns the messages back to the popup
 */
async function getWhatsAppMessages() {
  try {
    // Get the active tab
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const activeTab = tabs[0];

    if (!activeTab?.id) {
      return {
        success: false,
        error: 'No active tab found',
      };
    }

    // Check if it's WhatsApp Web
    if (!activeTab.url?.includes('web.whatsapp.com')) {
      return {
        success: false,
        error: 'Please open WhatsApp Web first. Navigate to web.whatsapp.com and open a chat.',
      };
    }

    // Extract messages from the content script
    const response = await chrome.tabs.sendMessage(activeTab.id, {
      type: 'EXTRACT_WHATSAPP_MESSAGES',
    });

    return response;
  } catch (error) {
    console.error('Background: Message extraction error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to extract messages from WhatsApp',
    };
  }
}