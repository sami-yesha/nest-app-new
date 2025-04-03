// Example: apps/gateway/src/auth/auth.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { ClientProxy } from '@nestjs/microservices';

describe('AuthController', () => {
  let controller: AuthController;
  let client: ClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: 'AUTH_SERVICE',
          useValue: {
            send: jest.fn().mockReturnValue({
              toPromise: jest.fn().mockResolvedValue({ success: true }),
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    client = module.get<ClientProxy>('AUTH_SERVICE');
  });

  it('should send register request', () => {
    controller.register({
      name: 'Test',
      email: 'test@test.com',
      password: 'password',
    });
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(client.send).toHaveBeenCalled();
  });
});
