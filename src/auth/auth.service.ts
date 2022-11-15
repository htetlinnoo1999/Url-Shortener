import { User } from '@entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOne(email);
    if (!user) throw new NotFoundException();
    const passwordValid = await bcrypt.compare(password, user.password);
    if (user && passwordValid) {
      // eslint-disable-next-line
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  async signUp(payload: CreateUserDto): Promise<User> {
    // eslint-disable-next-line
    const { password, ...rest } = await this.usersService.create(payload);
    return rest;
  }

  async login(user: User): Promise<string> {
    return this.jwtService.sign(user);
  }
}
