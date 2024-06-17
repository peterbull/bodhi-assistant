import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BodhicastProxyModule } from './bodhicast-proxy/bodhicast-proxy.module';

@Module({
  imports: [BodhicastProxyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
