const TELEGRAM_BOT_TOKEN = '1050803404:AAHRiumfPZ_LmWF1S7j-uAnJNdsRvzrO0Ec';
const CHAT_ID = 714203526;

export const sendTelegramMessage = async (message: string) => {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const payload = {
    chat_id: CHAT_ID,
    text: message,
    parse_mode: 'Markdown', // Use Markdown for formatting
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to send message to Telegram');
    }
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
  }
};