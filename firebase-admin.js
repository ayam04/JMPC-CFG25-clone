// utils/firebaseAdmin.js
import admin from 'firebase-admin';
import serviceAccount from './jpmc-593bf-firebase-adminsdk-fbsvc-7e8fe30ca1.json' assert { type: "json" };;
// const serviceAccount = require('./jpmc-593bf-firebase-adminsdk-fbsvc-7e8fe30ca1.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
let app; // Declare app outside the if block

try {
  if (!admin.apps.length) {
    app = admin.initializeApp({ // Assign the initialized app to the app variable
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('Firebase Admin SDK initialized');
  } else {
    app = admin.app(); // If already initialized, retrieve the existing app
    console.log('Firebase Admin SDK already initialized. Retrieving existing app.');
  }
} catch (error) {
  console.error('Firebase Admin initialization error:', error);
}

export default admin;