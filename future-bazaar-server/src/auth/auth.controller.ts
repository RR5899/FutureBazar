import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

  @Get('/test')
  async protectedRoute() {
    try {
      console.log('Successful in controller');      
    } catch (error) {
      return { msg: 'Error Occurred' };
    }
  }

}