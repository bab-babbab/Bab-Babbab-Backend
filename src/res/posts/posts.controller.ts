// src/res/posts/posts.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostEntity } from './entities/posts.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() dto: CreatePostDto): Promise<PostEntity> {
    return this.postsService.createPost(dto);
  }
}
