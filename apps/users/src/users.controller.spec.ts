import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from 'libs/common/src/interfaces/user.dto';

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
            create: jest.fn().mockResolvedValue({ id: '1' }),
            findAll: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('create()', () => {
    it('should call usersService.create', async () => {
      const dto: CreateUserDto = {
        name: 'Test',
        email: 'test@test.com',
        password: 'password',
        role: 'user',
      };
      await controller.create(dto);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(usersService.create).toHaveBeenCalledWith(dto);
    });
  });
});