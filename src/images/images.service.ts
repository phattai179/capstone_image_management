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

  getImageDeatail = async (id: number, res: Response) => {
    console.log('id', id)
    try {
      let data = await this.prisma.images.findUnique({
        where: {
          image_id: id
        },
        include: {
          users: true
        }
      })
      console.log('data', data)
      this.globalService.responseApi(res, 200, data, "Successfully")

    } catch (err) {
      console.log('err', err)
      this.globalService.responseApi(res, 400, err, "Error")
    }
  }

  checkImageSaved = async (userId: number, imageId: number, res: Response) => {

    try {
      const isSaved = await this.prisma.image_saved.findFirst({
        where: {
          image_id: imageId,
          user_id: userId
        }
      })

      return this.globalService.responseApi(res, 200, { isSaved: isSaved ? true : false }, "Successfully")
    } catch (err) {
      this.globalService.responseApi(res, 400, err, "Error")
    }
  }

  getImagesByUser = async (userId: number, res: Response) => {
    try {
      let result = await this.prisma.images.findMany({
        where: {
          user_id: userId
        }
      })

      this.globalService.responseApi(res, 200, result, "Successfully")

    } catch (err) {
      this.globalService.responseApi(res, 400, err, "Error")
    }
  }


  getImagesSaved = async (userId: number, res: Response) => {
    try {
      let result = await this.prisma.image_saved.findMany({
        where: {
          user_id: userId
        }
      })

      this.globalService.responseApi(res, 200, result, "Successfully")

    } catch (err) {
      this.globalService.responseApi(res, 200, err, "Error")
    }
  }


  async remove(id: number, res: Response) {
    try {
      const imagesDelelted = await this.prisma.images.delete({
        where: {
          image_id: id
        }
      })
      this.globalService.responseApi(res, 200, imagesDelelted, "Successfully")
    } catch (err) {
      this.globalService.responseApi(res, 400, err, "Error")
    }
  }

}
