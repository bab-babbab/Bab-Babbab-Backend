import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from '../posts/entities/posts.entity'

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) { }

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

  async getPhotoStreak(userId: string): Promise<number> {
    const posts = await this.postRepository.find({
      where: { user_id: userId },
      select: ['created_at', 'photo_b', 'photo_l', 'photo_d'],
      order: { created_at: 'DESC' },
    });

    const datePhotoMap = new Map<string, { b: boolean; l: boolean; d: boolean }>();

    posts.forEach(post => {
      const kst = new Date(post.created_at.getTime() + 9 * 60 * 60 * 1000);
      const dateStr = kst.toISOString().split('T')[0];

      if (!datePhotoMap.has(dateStr)) {
        datePhotoMap.set(dateStr, { b: false, l: false, d: false });
      }

      const record = datePhotoMap.get(dateStr);
      if (!record) return;

      if (post.photo_b && post.photo_b.trim()) record.b = true;
      if (post.photo_l && post.photo_l.trim()) record.l = true;
      if (post.photo_d && post.photo_d.trim()) record.d = true;
    });

    let streak = 0;
    const today = new Date();
    const todayKST = new Date(today.getTime() + 9 * 60 * 60 * 1000);

    for (let i = 0; ; i++) {
      const target = new Date(todayKST);
      target.setDate(todayKST.getDate() - i);
      const dateStr = target.toISOString().split('T')[0];

      const record = datePhotoMap.get(dateStr);
      if (!record) break;

      const dayCount =
        (record.b ? 1 : 0) + (record.l ? 1 : 0) + (record.d ? 1 : 0);

      if (dayCount === 0) break;

      streak += dayCount;

      if (dayCount < 3) break;
    }

    return streak;
  }
}