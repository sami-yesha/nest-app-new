import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UserResponseDto } from 'libs/common/src/interfaces/user.dto';
import { RolesGuard } from 'libs/common/src/guards/roles.guard';
import { Roles } from 'libs/common/src/decorators/roles.decorator';
import { UserRole } from 'libs/database/src/models/user.model';
import {
  CreateUserDto,
  UpdateUserDto,
} from 'libs/common/src/interfaces/user.dto';

@ApiTags('Users')
@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  @Get()
  @Roles(UserRole.USER, UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of users',
    type: [UserResponseDto],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Roles(UserRole.USER, UserRole.ADMIN)
  findAll() {
    return this.client.send('findAllUsers', {});
  }

  @Get(':id')
  @Roles(UserRole.USER, UserRole.ADMIN)
  findOne(@Param('id') id: string) {
    return this.client.send('findOneUser', id);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'User created',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.client.send('createUser', createUserDto);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.client.send('updateUser', { id, ...updateUserDto });
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.client.send('removeUser', id);
  }
}
