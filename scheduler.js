// scheduler.js
import cron from 'node-cron';
import twilio from 'twilio';
import admin from './firebase-admin.js';
import { configDotenv } from 'dotenv';
configDotenv();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

console.log("Account SID:", process.env.TWILIO_ACCOUNT_SID);
console.log("Auth Token:", process.env.TWILIO_AUTH_TOKEN);
console.log("Twilio Phone Number:", process.env.TWILIO_PHONE_NUMBER);

// Function to send SMS
async function sendSMS(phoneNumber, message) {
  console.log(phoneNumber);
  try {
    const client = twilio(accountSid, authToken);

    const smsResponse = await client.messages.create({
      body: message,
      to: phoneNumber,
      from: twilioPhoneNumber,
    });

    console.log(`SMS sent to ${phoneNumber}. SID: ${smsResponse.sid}`);
    return { success: true, sid: smsResponse.sid };
  } catch (error) {
    console.error('Error sending SMS:', error);
    return { success: false, error: error.message };
  }
}

// Function to check for upcoming sessions and send reminders
async function checkAndSendReminders() {
  const db = admin.firestore();
  const now = new Date();
  const reminderTime = new Date(now.getTime() + 15 * 60000); // 15 minutes from now (in milliseconds)

  console.log(`Checking for sessions starting within 15 minutes... Current Time: ${now.toLocaleTimeString()}, Reminder Time: ${reminderTime.toLocaleTimeString()}`);

  try {
    const sessionsSnapshot = await db.collection('sessions')
      .get();

    sessionsSnapshot.forEach(async doc => {
      const session = doc.data();
      const sessionTime = new Date(session.date_timing_in_ist); // Assuming date_timing_in_ist is a valid date string
      //  console.log(`Session Time: ${sessionTime.toLocaleTimeString()}`)

      if (sessionTime >= now && sessionTime <= reminderTime) {
        // Session is within the next 15 minutes, fetch volunteer and send SMS

        const volunteerDoc = await db.collection('volunteers').doc(String(session.volunteer_id)).get(); //doc method takes string so make sure its a string

        if (volunteerDoc.exists) {
          const volunteer = volunteerDoc.data();
          const message = `Reminder: You have a session for ${session.topic_name} (${session.subject_name}) at ${new Date(session.date_timing_in_ist).toLocaleTimeString()}  today.`;
          const smsResult = await sendSMS(volunteer.phoneNumber, message);

          if (smsResult.success) {
            console.log(`Reminder sent to ${volunteer.name} for session: ${session.id}`);
          } else {
            console.error(`Failed to send reminder to ${volunteer.name} for session: ${session.id}`, smsResult.error);
          }
        } else {
          console.error(`Volunteer with ID ${session.volunteer_id} not found.`);
        }
      }
    });

  } catch (error) {
    console.error('Error querying sessions:', error);
  }
}

// Schedule the task to run every 15 minutes (at the 0th, 15th, 30th, and 45th minute of every hour)
// cron.schedule('*/15 * * * *', () => {   //every 15 mins
cron.schedule('* * * * *', () => {   //every 1 min for testing purposes
    console.log('Running scheduled task...');
    checkAndSendReminders();
  },
  {
    scheduled: true,
    timezone: "Asia/Kolkata" // Set timezone to India Standard Time (IST)
  }
);

console.log('Scheduler started.  Checking for reminders every 15 minutes.');