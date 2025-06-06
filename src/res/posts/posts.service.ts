import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/posts.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async createPost(dto: CreatePostDto): Promise<Post> {
    const post = this.postRepository.create(dto);
    return await this.postRepository.save(post);
  }

  async findAllPosts(): Promise<Post[]> {
    return await this.postRepository.find({
      order: {
        created_at: 'DESC',
      },
    });
  }

  async findPostById(id: string): Promise<Post | null> {
    return await this.postRepository.findOneBy({ id });
  }
}
