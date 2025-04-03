import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'libs/database/src/models/user.model';
import { RegisterDto, LoginDto } from 'libs/common/src/interfaces/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = new this.userModel({
      ...registerDto,
      password: hashedPassword,
    });
    await user.save();

    const payload = { email: user.email, sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: this.sanitizeUser(user),
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userModel.findOne({ email: loginDto.email });
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const payload = { email: user.email, sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: this.sanitizeUser(user),
    };
  }

  private sanitizeUser(user: User) {
    const sanitized = user.toObject();
    delete sanitized.password;
    return sanitized;
  }

  async validateToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.userModel.findById(payload.sub).exec();

      if (!user) {
        throw new UnauthorizedException();
      }

      return {
        userId: user._id,
        email: user.email,
        role: user.role,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }
      throw new UnauthorizedException('Invalid token');
    }
  }
}
