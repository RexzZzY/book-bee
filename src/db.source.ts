import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const AppDataSourceOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '',
  database: 'bookbee',
  autoLoadEntities: true,
  synchronize: true,
};
