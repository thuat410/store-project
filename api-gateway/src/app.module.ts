import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NatsModule } from './nats/nats.module';
import { RedisCacheModule } from './redis-cache/redis-cache.module';

@Module({
  imports: [NatsModule, RedisCacheModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
