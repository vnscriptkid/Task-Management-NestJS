import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT),
  username: process.env.PG_USER,
  password: process.env.PG_PASS,
  database: process.env.PG_DB,
  entities: [__dirname + `/../**/*.entity{.ts,.js}`],
  synchronize: true,
  ssl: JSON.parse(process.env.TYPEORM_SSL),
  migrationsRun: true,
  logging: true,
  logger: 'file',
  // Allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev.
  migrations: [__dirname, '/../migrations/**/*{.ts,.js}'],
  cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: 'src/migrations',
  },
};

export { typeOrmConfig };
// In case of migrations
// export = typeOrmConfig;

// Apply migration steps:
// 1. npm run typeorm:migrate <myEntity-migration>
// 2. Check your migration queries in src/migrations
// 3. npm run start:dev or npm run start:prod or npm run typeorm:run
