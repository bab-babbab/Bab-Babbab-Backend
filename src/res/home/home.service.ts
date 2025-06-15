import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { UserProfileDto } from '../user/dto/user-profile.dto';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserInfo(userId: string): Promise<UserProfileDto> {
  const user = await this.userRepository.findOne({
    where: { id: userId },
    select: ['id', 'name', 'profile', 'message', 'class', 'grade'],
  });

  if (!user) {
    throw new Error('유저를 찾을 수 없습니다.');
  }

  return {
    userInfo: {
      id: user.id,
      name: user.name,
      profile: user.profile,
      message: user.message,
    },
    schoolInfo: {
      id : user.id,
      school_name : user.school_name,
      grade: user.grade,
      class: user.class,
    },
  };
}

}