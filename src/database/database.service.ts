import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { env } from 'config/config.service';
import entities from './entities';

const dbConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: env('DB_HOST'),
  username: env('DB_USERNAME'),
  password: env('DB_PASSWORD'),
  database: env('DB_NAME'),
  entities,
  synchronize: true,
};
export default dbConfig;
