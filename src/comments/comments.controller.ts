import { Controller, Get, Post, Body, Patch, Param, Delete, Response, Req, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Request } from 'express';

@UseGuards(AuthGuard("jwt"))
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Post('/post-comment')
  create(@Req() req: Request, @Body() body: CreateCommentDto, @Response() res) {
    console.log('req', req?.user['userId'])
    console.log('createComment', body)
    let userId = req?.user['userId']
    return this.commentsService.postComment(Number(userId), body, res);
  }

  @Get(':id')
  findAll(@Param('id') id: string, @Response() res) {
    return this.commentsService.getCommentImage(Number(id), res);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
