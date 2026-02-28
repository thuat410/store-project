import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NatsService } from './nats.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'], // This can be moved to ConfigModule later
        },
      },
    ]),
  ],
  providers: [NatsService],
  exports: [NatsService], // Export so other modules can use NatsService
})
export class NatsModule {}
