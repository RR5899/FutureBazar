import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseMiddleware implements NestMiddleware {
  constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App) { }
  async use(req: Request, res: Response, next: NextFunction) {
    next();
    // try {
    //   const token = req.headers.authorization?.split(' ')[1];
    //   if (!token) {
    //     throw new Error('Unauthorized');
    //   }

    //   const decodedToken = await this.firebaseAdmin.auth().verifyIdToken(token);
    //   req.user = decodedToken;
    //   next();
    // } 
    // catch (error) {
    //   throw new Error('Unauthorized');
    // }
  }
}
