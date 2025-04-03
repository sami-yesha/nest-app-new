// apps/gateway/src/auth/auth.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { RegisterDto } from 'libs/common/src/interfaces/auth.dto';
import { faker } from '@faker-js/faker';
import { AuthService } from '../../../auth/src/auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('register', () => {
    it('should call authService.register with correct params', async () => {
      const registerDto: RegisterDto = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      await controller.register(registerDto);
      expect(authService.register).toHaveBeenCalledWith(registerDto);
    });
  });

  describe('login', () => {
    it('should call authService.login with correct params', async () => {
      const loginDto = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      await controller.login(loginDto);
      expect(authService.login).toHaveBeenCalledWith(loginDto);
    });
  });
});
