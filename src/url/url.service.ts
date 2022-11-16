import { Url } from '@entities/url.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CreateUrlDto, UpdateUrlDto } from './dto/url.dto';
import { DateTime } from 'luxon';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url) private readonly urlsRepository: Repository<Url>,
  ) {}

  async getAll(): Promise<Url[]> {
    return await this.urlsRepository.findBy({
      deleted_at: IsNull(),
    });
  }

  async findById(id: number): Promise<Url> {
    return await this.urlsRepository.findOneBy({ id });
  }

  async findByColumn(payload: TUrlSearch): Promise<Url> {
    return await this.urlsRepository.findOneBy(payload);
  }

  async createOne(payload: CreateUrlDto): Promise<Url> {
    const newUrl = this.urlsRepository.create(payload);
    return this.urlsRepository.save(newUrl);
  }

  async updateOne(id: number, payload: UpdateUrlDto): Promise<Url> {
    return this.urlsRepository.save({
      id,
      ...payload,
    });
  }

  async deleteOne(id: number): Promise<void> {
    await this.urlsRepository.save({
      id,
      deleted_at: DateTime.now().toISO(),
    });
  }
}
