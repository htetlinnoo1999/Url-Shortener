import { User } from '@entities/user.entity';
import {
  Body,
  ConflictException,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { env } from 'config/config.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { User as UserDecorator } from '@decorators/user.decorator';
import { LocalAuthGuard } from '@guards/local.guard';
import { UsersService } from 'users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('sign-up')
  async signUp(@Body() body: CreateUserDto): Promise<User> {
    const emailExisted = await this.userService.findByColumn({
      email: body.email,
    });
    if (emailExisted) throw new ConflictException();
    const salt = parseInt(env('SALT'));
    const hashedPassword = await bcrypt.hash(body.password, salt);
    return await this.authService.signUp({ ...body, password: hashedPassword });
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@UserDecorator() user: User) {
    const token = await this.authService.login(user);
    return { ...user, token };
  }
}
