import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { env } from 'src/config/config.service';
import entities from './entities';

const dbConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: env('DB_HOST'),
  port: parseInt(env('DB_PORT')),
  username: env('DB_USERNAME'),
  password: env('DB_PASSWORD'),
  database: env('DB_NAME'),
  entities,
  synchronize: true,

  migrations: ['src/database/migration/*.ts'],
};
export default dbConfig;
