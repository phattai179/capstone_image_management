import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { GlobalService } from 'src/core/services/global/global.service';

@Injectable()
export class CommentsService {
  constructor(private globalService: GlobalService) { }

  prisma = new PrismaClient();

  create(createCommentDto: CreateCommentDto) {
    return 'This action adds a new comment';
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }

  // Custome
  async getCommentImage(idImage: number, res: Response) {
    try {
      let data = await this.prisma.comment_image.findMany({
        where: {
          image_id: idImage
        }
      })

      this.globalService.responseApi(res, 200, data, "Successfully")

    } catch (err) {
      this.globalService.responseApi(res, 400, err, "Error")
    }
  }

  async postComment(userId: number, body: CreateCommentDto, res: Response) {
    try {
      const newComment: CreateCommentDto = {
        user_id: userId,
        image_id: body.image_id,
        content: body.content,
        date_create: new Date()
      }
      await this.prisma.comment_image.create({ data: newComment })
      this.globalService.responseApi(res, 200, newComment, "Post comment successfully!")

    } catch (err) {
      this.globalService.responseApi(res, 400, err, "Error")
    }

  }

}
