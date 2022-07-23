import { AuthService } from './auth/auth.service';
import { Controller, Post, Request, UseGuards } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  // @Post('auth/login')
  // async login(@Request() req) {
  //   return this.authService.login(req.user);
  // }
}
