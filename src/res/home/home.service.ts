import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { UserInfoDto } from '../user/dto/user-info.dto';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserInfo(userId: string): Promise<UserInfoDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'name', 'profile', 'message'],
    });

    if (!user) {
      throw new Error('유저를 찾을 수 없습니다.');
    }

    // 매핑
    return {
      id: user.id,
      name: user.name,
      profile: user.profile,
      message: user.message,
    };
  }

}