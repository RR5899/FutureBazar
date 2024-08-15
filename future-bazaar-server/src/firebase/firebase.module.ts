import { Module, Global } from '@nestjs/common';
import { initializeFirebase } from './firebase-admin/firebase.config';

@Global()
@Module({
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: async () => {
        const firebaseApp = await initializeFirebase();
        return firebaseApp;
      }
    }
  ],
  exports: ['FIREBASE_ADMIN'],
})
export class FirebaseModule {}
