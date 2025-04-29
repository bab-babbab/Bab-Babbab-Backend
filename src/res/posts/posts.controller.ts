import { Controller, Post, Get, Body, Param, NotFoundException } from '@nestjs/common';
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

  @Get()
  async getAllPosts(): Promise<PostEntity[]> {
    return this.postsService.findAllPosts();
  }

  @Get(':id')
  async getPostById(@Param('id') id: string): Promise<PostEntity> {
    const post = await this.postsService.findPostById(id);
    if (!post) {
      throw new NotFoundException(`게시글을 찾을 수 없습니다.`);
    }
    return post;
  }
}
