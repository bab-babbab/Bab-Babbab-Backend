import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { Post } from '../posts/entities/posts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
