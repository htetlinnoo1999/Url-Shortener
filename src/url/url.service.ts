import { Url } from '@entities/url.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUrlDto, UpdateUrlDto } from './dto/url.dto';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url) private readonly urlsRepository: Repository<Url>,
  ) {}

  async getAll(): Promise<Url[]> {
    return await this.urlsRepository.find();
  }

  async findOne(id: number): Promise<Url> {
    return await this.urlsRepository.findOneBy({ id });
  }

  async createOne(payload: CreateUrlDto): Promise<Url> {
    const newUrl = this.urlsRepository.create(payload);
    return this.urlsRepository.save(newUrl);
  }

  async updateOne(id: number, payload: UpdateUrlDto): Promise<Url> {
    const url = await this.urlsRepository.findOneBy({ id });
    if (!url) throw new NotFoundException();

    return this.urlsRepository.save({
      id,
      ...payload,
    });
  }

  async deleteOne(id: number): Promise<void> {
    const url = await this.urlsRepository.findOneBy({ id });
    if (!url) throw new NotFoundException();
    await this.urlsRepository.delete(id);
  }
}
