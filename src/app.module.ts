import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../config/database/typeorm.config';
import { AppService } from './app.service';
import { PostsModule } from './res/posts/posts.module';
import { UserModule } from './res/user/user.module';
import { RankingModule } from './res/ranking/ranking.module';
import { HomeModule } from './res/home/home.module';
import { ReplysModule } from './res/replys/replys.module';
import { StatsModule } from './res/stats/stats.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

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
    ReplysModule,
    StatsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
