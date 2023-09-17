import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import { TrucksModule } from './trucks/trucks.module';
import { UsersModule } from './users/users.module';
import {User} from './users/users.model';
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User],
      autoLoadModels:true
    }),
      TrucksModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
