import { TypeOrmModuleOptions } from '@nestjs/typeorm';

console.log(process.env.NODE_ENV);

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT),
  username: process.env.PG_USER,
  password: process.env.PG_PASS,
  database: process.env.PG_DB,
  entities: [__dirname + `/../**/*.entity.ts`],
  synchronize: true,
  ssl: true,
};

// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: 'postgres',
//   host: 'ec2-75-101-128-10.compute-1.amazonaws.com',
//   port: 5432,
//   username: 'xqdyjeltkepcil',
//   password: '5d95b3f00cd15039282be4fd7154d49ec1c36841d3d33d04c99eaa987c39b5e2',
//   database: 'dckqa44jj9pp8e',
//   entities: [__dirname + '/../**/*.entity.ts'],
//   synchronize: true,
//   ssl: true,
// };
