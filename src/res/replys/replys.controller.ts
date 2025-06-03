import { Controller, Post, Get, Param, Body, NotFoundException } from '@nestjs/common';
import { ReplysService } from './replys.service';
import { CreateReplyDto } from './dto/create-reply.dto';
import { Reply } from './entities/replys.entity';

@Controller('posts/:postId/replys')
export class ReplysController {
  constructor(private readonly replysService: ReplysService) {}

  @Post()
  async createReply(
    @Param('postId') postId: string,
    @Body() dto: CreateReplyDto,
  ): Promise<Reply> {
    return this.replysService.create(postId, dto);
  }

  @Get()
  async getReplysByPostID (@Param('postId') postId : string) : Promise<Reply[]>{
    const replys = await this.replysService.getReplysByPostID(postId);
    if (!replys) {
      throw new NotFoundException(`댓글을 찾을 수 없습니다.`);
    }
    else {
      return this.replysService.getReplysByPostID(postId);
    }
  }
}
