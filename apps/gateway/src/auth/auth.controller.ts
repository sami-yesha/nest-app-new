// apps/gateway/src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  Inject,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { RegisterDto, LoginDto } from 'libs/common/src/interfaces/auth.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  register(@Body() registerDto: RegisterDto) {
    return this.client.send('register', registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  login(@Body() loginDto: LoginDto) {
    return this.client.send('login', loginDto);
  }
}
