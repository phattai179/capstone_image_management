import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GlobalService } from 'src/core/services/global/global.service';
import { JwtService } from 'src/core/services/jwt/jwt.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, GlobalService, JwtService],
})
export class AuthModule { }
