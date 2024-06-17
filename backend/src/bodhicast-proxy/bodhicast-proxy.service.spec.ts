import { Test, TestingModule } from '@nestjs/testing';
import { BodhicastProxyService } from './bodhicast-proxy.service';

describe('BodhicastProxyService', () => {
  let service: BodhicastProxyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BodhicastProxyService],
    }).compile();

    service = module.get<BodhicastProxyService>(BodhicastProxyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
