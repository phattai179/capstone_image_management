import { Body, Controller, Post, Response } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("/signUp")
  singUp(@Body() body, @Response() res) {
    this.authService.signUp(body, res)
  }

  @Post("/login")
  login(@Body() body, @Response() res) {
    console.log('body login', body)
    this.authService.login(body, res)
  }

}
