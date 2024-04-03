import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { GlobalService } from 'src/core/services/global/global.service';


@Module({
  controllers: [ImagesController],
  providers: [ImagesService, GlobalService],
})
export class ImagesModule { }
