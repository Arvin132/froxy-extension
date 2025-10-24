interface WhatsAppMessage {
  sender: 'user' | 'other';
  content: string;
}

function extractWhatsAppMessages(): WhatsAppMessage[] {
  const messages: WhatsAppMessage[] = [];
  const messageElements = document.querySelectorAll('[data-testid="msg-container"]');
  
  messageElements.forEach((msgElement) => {
    try {
      const isOutgoing = msgElement.classList.contains('message-out');
      const textElement = msgElement.querySelector('.copyable-text span.selectable-text');
      const content = textElement?.textContent?.trim() || '';
      if (content) {
        messages.push({
          sender: isOutgoing ? 'user' : 'other',
          content: content,
        });
      }
    } catch (error) {
      console.error('Froxy: Error extracting message:', error);
    }
  });

  return messages;
}

function isWhatsAppChatOpen(): boolean {
  const chatHeader = document.querySelector('[data-testid="conversation-header"]');

  return !!chatHeader;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'EXTRACT_WHATSAPP_MESSAGES') {
    try {
    //   if (!isWhatsAppChatOpen()) {
    //     sendResponse({ 
    //       success: false, 
    //       error: 'No WhatsApp chat is currently open. Please open a conversation first.' 
    //     });
    //     return;
    //   }

      const messages = extractWhatsAppMessages();
      console.log(messages)
      
      if (messages.length === 0) {
        sendResponse({ 
          success: false, 
          error: 'No messages found in the current chat.' 
        });
        return;
      }

      sendResponse({ 
        success: true, 
        data: messages 
      });
    } catch (error) {
      sendResponse({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to extract messages' 
      });
    }
  }
  
  return true;
});

console.log('Froxy: WhatsApp content script loaded');