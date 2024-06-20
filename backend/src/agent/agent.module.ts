import { Module } from '@nestjs/common';
import { AgentController } from './agent.controller';
import { AgentService } from './agent.service';
import { BodhicastProxyService } from 'src/bodhicast-proxy/bodhicast-proxy.service';

@Module({
  controllers: [AgentController],
  providers: [AgentService, BodhicastProxyService],
})
export class AgentModule {}
