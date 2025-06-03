import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserInfoDto } from './dto/user-info.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async upsertUserInfo(userInfoDto: UserInfoDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userInfoDto.id } });

    if (user) {
      // update
      const updated = this.userRepository.merge(user, userInfoDto);
      return await this.userRepository.save(updated);
    } else {
      // insert
      const newUser = this.userRepository.create(userInfoDto);
      return await this.userRepository.save(newUser);
    }
  }
}