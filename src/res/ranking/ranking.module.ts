import { Module } from '@nestjs/common';
import { RankingController } from './ranking.controller';
import { RankingService } from './ranking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../posts/entities/posts.entity';
import { User } from '../user/entities/user.entity';
import { StatsService } from '../stats/stats.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post])],
  controllers: [RankingController],
  providers: [RankingService, StatsService],
})
export class RankingModule {}
