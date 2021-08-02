import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { SbmmOfferClient } from './offer_grpc_pb';
import { EmptyInput, OfferId, Offers, Offer } from './offer_pb';
import { credentials } from 'grpc';
import _ from 'lodash';

@Controller('offer')
export class OfferController implements OnModuleInit {
  private offerClient;
  //constructor(@Inject('OFFER_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.offerClient = new SbmmOfferClient("localhost:50051", credentials.createInsecure());
  }
  
  @Get()
  getAll(): Promise<Offers>  {
    console.log("ready to call grpc server for query all.");
    let tmp: EmptyInput = new EmptyInput();
    return new Promise<Offers>((resove, reject) => {
      this.offerClient.findAll(tmp, (err, offers) =>{
        if(err) 
           reject(err);
        else 
        {
           console.log(JSON.stringify(offers));
           resove(offers);
        }
      })
    });
  }

  @Get(':id')
  getById(@Param('id') id: number): Promise<Offer> {
    console.log("ready to call grpc server.");
    let tmpa = '';
    let tmpb = _.isEmpty(tmpa);
    console.log('try: '+tmpb);
    let tmp = new OfferId();
    tmp.setId(id);
    console.log(JSON.stringify(tmp));
    return new Promise<Offer>((resove, reject) => {
      this.offerClient.findOne(tmp, (err, offer) =>{
        if(err) 
           reject(err);
        else 
        {
           console.log(JSON.stringify(offer));
           resove(offer);
        }
      })
    });
  }
}