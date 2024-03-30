import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { PrismaClient, images } from '@prisma/client';
import { GlobalService } from 'src/core/services/global/global.service';
import { Response } from 'express';

@Injectable()
export class ImagesService {
  constructor(private globalService: GlobalService) { }
  prisma = new PrismaClient();

  create(createImageDto: CreateImageDto) {
    return 'This action adds a new image';
  }

  async findAll(): Promise<images[]> {
    return await this.prisma.images.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }

  // custome
  getImages = async (keyword: any, res: Response) => {
    let result = []
    console.log('keyword', keyword)
    try {
      if (keyword) {
        result = await this.prisma.images.findMany({
          where: {
            name: {
              contains: keyword
            }
          }
        })
        console.log('result', result)
      } else {
        result = await this.prisma.images.findMany()
      }
      this.globalService.responseApi(res, 200, result, "Successfully")
    } catch (err) {
      this.globalService.responseApi(res, 500, err, "Error");

    }


  }


}
