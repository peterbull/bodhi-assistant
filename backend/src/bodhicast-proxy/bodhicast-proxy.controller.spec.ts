import { Test, TestingModule } from '@nestjs/testing';
import { BodhicastProxyController } from './bodhicast-proxy.controller';

describe('BodhicastProxyController', () => {
  let controller: BodhicastProxyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BodhicastProxyController],
    }).compile();

    controller = module.get<BodhicastProxyController>(BodhicastProxyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
