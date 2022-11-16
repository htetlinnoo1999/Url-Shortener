import { Url } from '@entities/url.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Response,
} from '@nestjs/common';
import { randomStringGenerator } from 'helper/helper';
import { CreateUrlDto, UpdateUrlDto } from './dto/url.dto';
import { UrlService } from './url.service';
import * as express from 'express';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Get()
  async getAll(): Promise<Url[]> {
    return await this.urlService.getAll();
  }

  @Get('shorten/:key')
  async getUrl(
    @Param('key') key: string,
    @Response() res: express.Response,
  ): Promise<void> {
    const url = await this.urlService.findByColumn({ shortenUrl: key });
    if (!url) throw new NotFoundException();

    await this.urlService.updateOne(url.id, {
      count: url.count++,
    });
    res.redirect(HttpStatus.MOVED_PERMANENTLY, url.originalUrl);
  }

  @Get(':id/details')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Url> {
    return await this.urlService.findById(id);
  }

  @Post()
  async createOne(@Body() body: CreateUrlDto): Promise<Url> {
    return await this.urlService.createOne({
      ...body,
      shortenUrl: randomStringGenerator(8),
    });
  }

  @Put(':id')
  async updateOne(
    @Body() body: UpdateUrlDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Url> {
    const url = await this.urlService.findById(id);
    if (!url) throw new NotFoundException();
    return await this.urlService.updateOne(id, body);
  }

  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const url = await this.urlService.findById(id);
    if (!url) throw new NotFoundException();
    return await this.urlService.deleteOne(id);
  }
}
