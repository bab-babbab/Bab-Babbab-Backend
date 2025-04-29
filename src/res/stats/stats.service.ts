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

    async getDailyPostCount(): Promise<{date : string; count: number }[]> {
        return await this.postRepository
            .createQueryBuilder('post')
            .select("DATE_FORMAT(post.created_at, '%Y-%m-%d')", 'date')
            .addSelect('COUNT(*)', 'count')
            .groupBy('date')
            .orderBy('date', 'DESC')
            .getRawMany();
    }
}