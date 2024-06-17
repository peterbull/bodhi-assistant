import { Module } from '@nestjs/common';
import { BodhicastProxyController } from './bodhicast-proxy.controller';
import { BodhicastProxyService } from './bodhicast-proxy.service';

@Module({
  controllers: [BodhicastProxyController],
  providers: [BodhicastProxyService],
})
export class BodhicastProxyModule {}
