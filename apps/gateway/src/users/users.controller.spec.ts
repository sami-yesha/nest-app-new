// apps/gateway/src/users/users.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UserRole } from 'libs/database/src/models/user.model';
import { CreateUserDto } from 'libs/common/src/interfaces/user.dto';
import { faker } from '@faker-js/faker';
import { UsersService } from '../../../users/src/users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('findAll', () => {
    it('should call usersService.findAll', async () => {
      await controller.findAll();
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should call usersService.create with correct params', async () => {
      const createUserDto: CreateUserDto = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: UserRole.USER,
      };

      await controller.create(createUserDto);
      expect(usersService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  // Add similar tests for findOne, update, remove
});
