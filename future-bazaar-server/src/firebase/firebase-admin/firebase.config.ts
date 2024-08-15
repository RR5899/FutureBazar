import * as admin from 'firebase-admin';

export const initializeFirebase = async () => {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        projectId: process.env.FIREBASE_PROJECT_ID
    });
    return admin;
};
