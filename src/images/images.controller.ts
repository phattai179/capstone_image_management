import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Headers, Response } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@UseGuards(AuthGuard("jwt"))
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) { }

  // @Post()
  // create(@Body() createImageDto: CreateImageDto) {
  //   return this.imagesService.create(createImageDto);
  // }

  @Get("/get-images-by-user")
  getImagesByUser(@Req() req: Request, @Response() res) {
    const userId = req.user['userId']
    this.imagesService.getImagesByUser(Number(userId), res)
  }

  @Get("/get-images-saved")
  getImagesSaved(@Req() req: Request, @Response() res) {
    const userId = req.user['userId']
    this.imagesService.getImagesSaved(Number(userId), res)
  }

  @Get()
  findAll(@Req() req: Request, @Headers() header, @Response() res) {
    const { search } = req.query || ''
    console.log('req', req)
    return this.imagesService.getImages(search, res);
  }


  @Get(':id')
  findOne(@Param('id') id: number, @Response() res) {
    return this.imagesService.getImageDeatail(Number(id), res);
  }


  @Post('check-image')
  checkImage(@Req() req: Request, @Body() body, @Response() res) {
    const userId = req.user['userId']
    const imageId = body.imageId
    this.imagesService.checkImageSaved(Number(userId), Number(imageId), res)
  }


  @Delete(':id')
  remove(@Param('id') id: number, @Response() res) {
    return this.imagesService.remove(Number(id), res);
  }
}
