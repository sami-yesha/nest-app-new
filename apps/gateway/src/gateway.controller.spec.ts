import { Test, TestingModule } from '@nestjs/testing';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';

describe('GatewayController', () => {
  let gatewayController: GatewayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GatewayController],
      providers: [GatewayService],
    }).compile();

    gatewayController = app.get<GatewayController>(GatewayController);
  });

  describe('root', () => {
    it('Wellcome To This Microservice Project!"', () => {
      expect(gatewayController.getHello()).toBe(
        'Wellcome To This Microservice Project!',
      );
    });
  });
});
