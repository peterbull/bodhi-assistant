import { Controller, Get } from '@nestjs/common';
import { BodhicastProxyService } from './bodhicast-proxy.service';

@Controller('bodhicast-proxy')
export class BodhicastProxyController {
  constructor(private readonly bodhicastProxyService: BodhicastProxyService) {}

  @Get()
  getApiSpec() {
    return this.bodhicastProxyService.fetchBodhicastApiSpec();
  }
}
