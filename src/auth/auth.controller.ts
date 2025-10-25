import { Controller, Get, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from 'src/auth/utils/Guards';

@Controller('auth')
export class AuthController {
  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  handlerRedirect() {
    return { message: 'Google authentication successful' };
  }
}
