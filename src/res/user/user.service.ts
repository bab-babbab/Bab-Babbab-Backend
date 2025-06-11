import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserInfoDto } from './dto/user-info.dto';
import { SchoolInfoDto } from './dto/school-info.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async saveUserInfo(dto: UserInfoDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: dto.id } });

    if (user) {
      const updated = this.userRepository.merge(user, dto);
      return await this.userRepository.save(updated);
    } else {
      const newUser = this.userRepository.create(dto);
      return await this.userRepository.save(newUser);
    }
  }

  async saveSchoolInfo(dto: SchoolInfoDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: dto.id } });

    if (user) {
      const updated = this.userRepository.merge(user, dto);
      return await this.userRepository.save(updated);
    } else {
      const newUser = this.userRepository.create(dto);
      return await this.userRepository.save(newUser);
    }
  }
}
