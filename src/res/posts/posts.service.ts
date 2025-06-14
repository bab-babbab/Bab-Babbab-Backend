import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/posts.entity';
import { CreatePostDto } from './dto/create-post.dto';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PostsService {
  private readonly s3: AWS.S3;

  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {
    this.s3 = new AWS.S3({
      region: 'ap-northeast-2',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_KEY!,
      },
    });
  }

  async createPost(
    dto: CreatePostDto,
    files: { photo_b?: Express.Multer.File; photo_l?: Express.Multer.File; photo_d?: Express.Multer.File },
  ): Promise<Post> {
    const today = new Date();
    const datePath = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

    const uploadImage = async (file?: Express.Multer.File): Promise<string | null> => {
      if (!file) return null;

      const key = `posts/${dto.user_id}/${datePath}/${uuid()}.jpg`;
      const uploadResult = await this.s3
        .upload({
          Bucket: process.env.AWS_BUCKET_NAME!,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: 'public-read',
        })
        .promise();

      return uploadResult.Location;
    };

    const photo_b_url = await uploadImage(files.photo_b);
    const photo_l_url = await uploadImage(files.photo_l);
    const photo_d_url = await uploadImage(files.photo_d);

    const post = new Post();
    post.user_id = dto.user_id;
    post.comment = dto.comment;
    post.photo_b = photo_b_url || undefined;
    post.photo_l = photo_l_url || undefined;
    post.photo_d = photo_d_url || undefined;

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
