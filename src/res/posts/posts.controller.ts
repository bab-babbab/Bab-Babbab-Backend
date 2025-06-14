import { Controller, Post as HttpPost, Get, Body, UploadedFiles, UseInterceptors, Param, NotFoundException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostEntity } from './entities/posts.entity';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @HttpPost()
  @UseInterceptors(AnyFilesInterceptor())
  async createPost(
    @Body() dto: CreatePostDto,
    @UploadedFiles()
    files: Express.Multer.File[],
  ) {
    const fileMap: Record<string, Express.Multer.File> = {};
    for (const file of files) {
      if (file.fieldname === 'photo_b') fileMap.photo_b = file;
      if (file.fieldname === 'photo_l') fileMap.photo_l = file;
      if (file.fieldname === 'photo_d') fileMap.photo_d = file;
    }

    return this.postsService.createPost(dto, fileMap);
  }

  @Get()
  async getAllPosts(): Promise<PostEntity[]> {
    return this.postsService.findAllPosts();
  }

  @Get(':id')
  async getPost(@Param('id') id: string): Promise<PostEntity> {
    const post = await this.postsService.findPostById(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

}
