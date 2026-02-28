import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { NatsService } from './nats.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'NATS_SERVICE',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const natsUrl = configService.get<string>('NATS_SERVER_URL');
          return {
            transport: Transport.NATS,
            options: {
              servers: [natsUrl || 'nats://localhost:4222'],
            },
          };
        },
      },
    ]),
  ],
  providers: [NatsService],
  exports: [NatsService], // Export so other modules can use NatsService
})
export class NatsModule { }
