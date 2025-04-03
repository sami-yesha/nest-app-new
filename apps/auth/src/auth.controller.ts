import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from 'libs/common/src/interfaces/auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('register')
  async register(@Payload() registerDto: RegisterDto) {
    try {
      return await this.authService.register(registerDto);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
          error: error.message,
          statusCode: 400,
        };
      }
      return {
        error: 'An unknown error occurred',
        statusCode: 400,
      };
    }
  }

  @MessagePattern('login')
  async login(@Payload() loginDto: LoginDto) {
    try {
      return await this.authService.login(loginDto);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
          error: 'Invalid credentials',
          statusCode: 401,
        };
      }
      return {
        error: 'An unknown error occurred',
        statusCode: 400,
      };
    }
  }

  @MessagePattern('validateToken')
  async validateToken(@Payload() token: string) {
    try {
      return await this.authService.validateToken(token);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
          error: 'Invalid token',
          statusCode: 401,
        };
      }
      return {
        error: 'An unknown error occurred',
        statusCode: 400,
      };
    }
  }
}
