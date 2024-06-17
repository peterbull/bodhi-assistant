import { Test, TestingModule } from '@nestjs/testing';
import { BodhicastProxyController } from './bodhicast-proxy.controller';
import { BodhicastProxyService } from './bodhicast-proxy.service';

describe('BodhicastProxyController', () => {
  let controller: BodhicastProxyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BodhicastProxyController],
      providers: [BodhicastProxyService],
    }).compile();

    controller = module.get<BodhicastProxyController>(BodhicastProxyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
