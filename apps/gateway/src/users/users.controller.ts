import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { ClientProxy, Client, Transport } from '@nestjs/microservices';
import { RolesGuard } from 'libs/common/src/guards/roles.guard';
import { Roles } from 'libs/common/src/decorators/roles.decorator';
import { UserRole } from 'libs/database/src/models/user.model';
import {
  CreateUserDto,
  UpdateUserDto,
} from 'libs/common/src/interfaces/user.dto';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  @Get()
  @Roles(UserRole.USER, UserRole.ADMIN)
  async findAll() {
    return this.client.send('findAllUsers', {});
  }

  @Get(':id')
  @Roles(UserRole.USER, UserRole.ADMIN)
  async findOne(@Param('id') id: string) {
    return this.client.send('findOneUser', id);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  async create(@Body() createUserDto: CreateUserDto) {
    return this.client.send('createUser', createUserDto);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.client.send('updateUser', { id, ...updateUserDto });
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async remove(@Param('id') id: string) {
    return this.client.send('removeUser', id);
  }
}
