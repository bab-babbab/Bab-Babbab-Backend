import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reply } from './entities/replys.entity';
import { CreateReplyDto } from './dto/create-reply.dto';

@Injectable()
export class ReplysService {
  constructor(
    @InjectRepository(Reply)
    private readonly replyRepository: Repository<Reply>,
  ) {}

  async create(post_id: string, dto: CreateReplyDto): Promise<Reply> {
    const newReply = this.replyRepository.create({ ...dto, post_id });
    return await this.replyRepository.save(newReply);
  }

  async getReplysByPostID(post_id : string): Promise<Reply[]> {
    return await this.replyRepository.find({
        where: { post_id },
        order: {
          created_at: 'ASC',
        },
      });
  }
}
