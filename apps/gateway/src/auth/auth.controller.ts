// apps/gateway/src/auth/auth.controller.ts
import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RegisterDto, LoginDto } from 'libs/common/src/interfaces/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly client: ClientProxy
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.client.send('register', registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.client.send('login', loginDto);
  }
}