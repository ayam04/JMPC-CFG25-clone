// // ./pages/api/send-reminders.js

// import admin from '../../../firebase-admin'; // Import the initialized Firebase Admin SDK

// const accountSid = process.env.TWILIO_ACCOUNT_SID; // Store in environment variables
// const authToken = process.env.TWILIO_AUTH_TOKEN;   // Store in environment variables
// const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER; // Your Twilio number

// const twilio = require('twilio')(accountSid, authToken);

// async function sendSMS(phoneNumber, message) {
//     try {
//         const smsResponse = await twilio.messages.create({
//             body: message,
//             to: phoneNumber,
//             from: twilioPhoneNumber,
//         });

//         console.log(`SMS sent to ${phoneNumber}. SID: ${smsResponse.sid}`);
//         return { success: true, sid: smsResponse.sid };
//     } catch (error) {
//         console.error('Error sending SMS:', error);
//         return { success: false, error: 'Failed to send SMS', details: error.message };
//     }
// }

// export default async function handler(req, res) { // Next.js API route handler
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method Not Allowed' });
//   }
//   try {
//         const now = new Date(); // Current time
//         const db = admin.firestore();
//         const sessionsRef = db.collection('sessions');
//         const snapshot = await sessionsRef.get();

//         snapshot.forEach(async doc => {
//             const session = doc.data();

//             if (session.reminderSent) { // Skip if reminder already sent
//                 return;
//             }

//             const sessionTime = new Date(session.date_timing_in_ist);
//             const reminderTime = new Date(sessionTime.getTime() - 15 * 60000); // Subtract 15 minutes (milliseconds)

//             if (now >= reminderTime && now < sessionTime) { // Check if it's time to send the reminder

//                 // Get volunteer details
//                 const volunteerRef = db.collection('volunteers').doc(session.volunteer_id.toString()); // Ensure volunteer_id is a string to match the doc ID
//                 const volunteerDoc = await volunteerRef.get();

//                 if (volunteerDoc.exists) {
//                     const volunteer = volunteerDoc.data();
//                     const phoneNumber = volunteer.phoneNumber;

//                     const message = `Reminder: You have a session for ${session.topic_name} (${session.subject_name}, ${session.grade_class}) at ${session.school_name} in 15 minutes!`; // Customize the message

//                     const smsResult = await sendSMS(phoneNumber, message);

//                     if (smsResult.success) {
//                         // Update the session document to mark the reminder as sent
//                         await db.collection('sessions').doc(doc.id).update({ reminderSent: true });
//                         console.log(`Reminder sent for session: ${doc.id}`);
//                     } else {
//                         console.error(`Failed to send reminder for session ${doc.id}:`, smsResult.error);
//                     }
//                 } else {
//                     console.error(`Volunteer not found for session ${doc.id}`);
//                 }
//             }
//         });

//         // Important:  Return a response to the triggering service (even if it's just an acknowledgement)
//         return res.status(200).json({ message: 'Session reminder check complete.' });

//     } catch (error) {
//         console.error('Error processing sessions:', error);
//          return res.status(500).json({ error: 'Failed to process sessions', details: error.message });
//     }
// }