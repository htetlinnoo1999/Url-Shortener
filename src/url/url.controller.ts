import { Url } from '@entities/url.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  GoneException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Response,
  UseGuards,
} from '@nestjs/common';
import { randomStringGenerator } from 'helper/helper';
import { CreateUrlDto, UpdateUrlDto } from './dto/url.dto';
import { UrlService } from './url.service';
import * as express from 'express';
import { JwtAuthGuard } from '@guards/jwt.guard';
import { DateTime } from 'luxon';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll(): Promise<Url[]> {
    return await this.urlService.getAll();
  }

  @Get('shorten/:key')
  async getUrl(
    @Param('key') key: string,
    @Response() res: express.Response,
  ): Promise<void> {
    const url = await this.urlService.findByColumn({ shortenUrl: key });
    if (
      !url ||
      DateTime.now().toISO() > url?.expired_at?.toISOString() ||
      url.deleted_at
    )
      throw new GoneException();

    await this.urlService.updateOne(url.id, {
      count: url.count++,
    });
    res.redirect(HttpStatus.MOVED_PERMANENTLY, url.originalUrl);
  }

  @Get(':id/details')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Url> {
    return await this.urlService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOne(@Body() body: CreateUrlDto): Promise<Url> {
    return await this.urlService.createOne({
      ...body,
      shortenUrl: randomStringGenerator(8),
    });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateOne(
    @Body() body: UpdateUrlDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Url> {
    const url = await this.urlService.findById(id);
    if (!url) throw new NotFoundException();
    return await this.urlService.updateOne(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteOne(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const url = await this.urlService.findById(id);
    if (!url) throw new NotFoundException();
    return await this.urlService.deleteOne(id);
  }
}
