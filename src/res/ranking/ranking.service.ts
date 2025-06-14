import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../posts/entities/posts.entity';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { StatsService } from '../stats/stats.service';

@Injectable()
export class RankingService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    private readonly statsService: StatsService,
  ) {}

  async getRanking(): Promise<{ userId: string; streak: number }[]> {
    const allUsers = await this.userRepository.find({ select: ['id'] });

    const rankings = await Promise.all(
      allUsers.map(async user => {
        const streak = await this.statsService.getPhotoStreak(user.id);
        return { userId: user.id, streak };
      }),
    );

    return rankings.sort((a, b) => b.streak - a.streak);
  }
}
