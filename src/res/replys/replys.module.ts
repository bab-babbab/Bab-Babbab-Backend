import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReplysController } from './replys.controller';
import { ReplysService } from './replys.service';
import { Reply } from './entities/replys.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reply])],
  controllers: [ReplysController],
  providers: [ReplysService],
})
export class ReplysModule {}
