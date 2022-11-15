import { Url } from '@entities/url.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { randomStringGenerator } from 'helper/helper';
import { CreateUrlDto, UpdateUrlDto } from './dto/url.dto';
import { UrlService } from './url.service';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Get()
  async getAll(): Promise<Url[]> {
    return await this.urlService.getAll();
  }

  @Get(':id/details')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Url> {
    return await this.urlService.findOne(id);
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
    return await this.urlService.updateOne(id, body);
  }

  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.urlService.deleteOne(id);
  }
}
