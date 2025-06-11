import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { In } from 'typeorm';
import { Post } from '../posts/entities/posts.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class RankingService {
  constructor(

    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}  //의존성 주입

  async getWeeklyRanking(): Promise <
    {
        userId: string;
        name: string;
        profile: string;
        uploadCount: number
    }[] //형식 지정
  > {
    const now = new Date();
    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(now.getDate() - 6);

    const raw = await this.postRepository
      .createQueryBuilder('post')
      .select('post.user_id', 'userId')
      .addSelect(`
        SUM(
          IF(post.photo_b IS NOT NULL AND post.photo_b != '', 1, 0)
          + IF(post.photo_l IS NOT NULL AND post.photo_l != '', 1, 0)
          + IF(post.photo_d IS NOT NULL AND post.photo_d != '', 1, 0)
        ) 
      `, 'uploadCount')
      .where('post.created_at BETWEEN :start AND :end', {
        start: oneWeekAgo.toISOString().split('T')[0],
        end: now.toISOString().split('T')[0],
      })
      .groupBy('post.user_id')
      .orderBy('uploadCount', 'DESC')
      .limit(10)
      .getRawMany();

      const userIds = raw.map((r) => r.userId);
      const users = await this.userRepository.findBy({
        id: In(userIds)
      });

    return raw.map((r) => {
      const user = users.find((u) => u.id === r.userId);
      return {
        userId: r.userId,
        name: user?.name ?? '',
        profile: user?.profile ?? '',
        uploadCount: parseInt(r.uploadCount, 10),
      };
    });
  }
}
