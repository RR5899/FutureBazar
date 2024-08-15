import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    AuthService, {
      provide: 'AUTH_SERVICE',
      useClass: AuthService
    }
  ],
})
export class AuthModule { }
