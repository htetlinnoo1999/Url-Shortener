import { User } from '@entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'auth/dto/user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User> {
    // eslint-disable-next-line
    return await this.usersRepository.findOneBy({
      email,
    });
  }

  async create(payload: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(payload);
    return this.usersRepository.save(newUser);
  }
}
