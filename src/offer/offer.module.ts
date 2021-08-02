import { Module } from '@nestjs/common';
import { OfferController } from './offer.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'OFFER_PACKAGE',
        ...{
            transport: Transport.GRPC,
            options: {
              url: 'localhost:50051',
              package: 'offer',
              protoPath: join(__dirname, './offer.proto'),
            },
          },
      },
    ]),
  ],
  controllers: [OfferController],
})
export class OfferModule {}