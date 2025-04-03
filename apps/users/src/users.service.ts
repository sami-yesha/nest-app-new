import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'libs/database/src/models/user.model';
import {
  CreateUserDto,
  UserResponseDto,
  UpdateUserDto,
} from 'libs/common/src/interfaces/user.dto';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = new this.userModel(createUserDto);
    await user.save();
    return this.sanitizeUser(user);
  }
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userModel.find().select('-password -role').exec();
    return users.map((user) => this.sanitizeUser(user));
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.sanitizeUser(user);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.sanitizeUser(user);
  }

  async remove(id: string): Promise<UserResponseDto> {
    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.sanitizeUser(user);
  }

  private sanitizeUser(user: User): Omit<UserResponseDto, 'password'> {
    const sanitized = user.toObject() as Omit<UserResponseDto, 'password'>;
    return sanitized;
  }
}
