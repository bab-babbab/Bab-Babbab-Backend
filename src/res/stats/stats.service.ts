import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from '../posts/entities/posts.entity'

@Injectable()
export class StatsService{
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
    ){}

    async getDailyPostCount(userId: string): Promise<{ date: string; count: number }[]> {
        const raw = await this.postRepository
          .createQueryBuilder('post')
          .select("DATE(post.created_at)", 'date')
          .addSelect(`
            SUM(
              IF(post.photo_b != '', 1, 0) +
              IF(post.photo_l != '', 1, 0) +
              IF(post.photo_d != '', 1, 0)
            )
          `, 'count')
          .where('post.user_id = :userId', { userId })
          .groupBy('date')
          .orderBy('date', 'DESC')
          .getRawMany();
      
        return raw.map(row => ({
          date: row.date.toISOString().slice(0, 10),
          count: parseInt(row.count, 10),
        }));
      }
      
}