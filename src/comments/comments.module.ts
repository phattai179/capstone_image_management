import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { GlobalService } from 'src/core/services/global/global.service';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, GlobalService],
})
export class CommentsModule { }
