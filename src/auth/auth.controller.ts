import { Body, Controller, Post, Response, Req, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express';

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

  @UseGuards(AuthGuard("jwt"))
  @Get("/get-user")
  getUser(@Req() req: Request, @Response() res) {
    console.log('req', req)
    const userId = req.user['userId']

    this.authService.getUser(Number(userId), res)
  }

}
