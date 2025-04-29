// src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../config/database/typeorm.config';
import { AppService } from './app.service';
import { PostsModule } from './res/posts/posts.module';
import { UserModule } from './res/user/user.module';
import { RankingModule } from './res/ranking/ranking.module';
import { HomeModule } from './res/home/home.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    PostsModule,
    UserModule,
    RankingModule,
    HomeModule,
  ],
  providers: [AppService],
})
export class AppModule {}
