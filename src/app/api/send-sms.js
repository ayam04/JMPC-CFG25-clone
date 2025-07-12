// pages/api/send-sms.js
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Store in environment variables
const authToken = process.env.TWILIO_AUTH_TOKEN;   // Store in environment variables
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER; // Your Twilio number

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { phoneNumber, message } = req.body;

    if (!phoneNumber || !message) {
      return res.status(400).json({ error: 'Phone number and message are required.' });
    }

    if (!accountSid || !authToken || !twilioPhoneNumber) {
      console.error('Twilio credentials not configured.');
      return res.status(500).json({ error: 'Twilio credentials not configured.  Check your environment variables.' });
    }

    const client = twilio(accountSid, authToken);

    try {
      const smsResponse = await client.messages.create({
        body: message,
        to: phoneNumber,
        from: twilioPhoneNumber,
      });

      console.log(`SMS sent to ${phoneNumber}. SID: ${smsResponse.sid}`);
      return res.status(200).json({ success: true, sid: smsResponse.sid });
    } catch (error) {
      console.error('Error sending SMS:', error);
      return res.status(500).json({ error: 'Failed to send SMS', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' }); // Only allow POST requests
  }
}