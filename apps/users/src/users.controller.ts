import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  UpdateUserDto,
} from 'libs/common/src/interfaces/user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('findAllUsers')
  async findAll() {
    try {
      return await this.usersService.findAll();
    } catch (error) {
      return {
        error: error.message,
        statusCode: 500,
      };
    }
  }

  @MessagePattern('findOneUser')
  async findOne(@Payload() id: string) {
    try {
      return await this.usersService.findOne(id);
    } catch (error) {
      return {
        error: 'User not found',
        statusCode: 404,
      };
    }
  }

  @MessagePattern('createUser')
  async create(@Payload() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      return {
        error: error.message,
        statusCode: 400,
      };
    }
  }

  @MessagePattern('updateUser')
  async update(@Payload() data: { id: string; updateUserDto: UpdateUserDto }) {
    try {
      const { id, updateUserDto } = data;
      return await this.usersService.update(id, updateUserDto);
    } catch (error) {
      return {
        error: error.message,
        statusCode: 400,
      };
    }
  }

  @MessagePattern('removeUser')
  async remove(@Payload() id: string) {
    try {
      return await this.usersService.remove(id);
    } catch (error) {
      return {
        error: error.message,
        statusCode: 400,
      };
    }
  }
}
