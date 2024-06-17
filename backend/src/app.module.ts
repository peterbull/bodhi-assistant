import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BodhicastProxyModule } from './bodhicast-proxy/bodhicast-proxy.module';
import { AgentModule } from './agent/agent.module';

@Module({
  imports: [BodhicastProxyModule, AgentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
