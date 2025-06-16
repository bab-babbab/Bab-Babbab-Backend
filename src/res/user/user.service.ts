import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserInfoDto } from './dto/user-info.dto';
import { SchoolInfoDto } from './dto/school-info.dto';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  private readonly s3: AWS.S3;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    this.s3 = new AWS.S3({
      region: 'ap-northeast-2',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_KEY!,
      }

    });
  }

  async saveUserInfo(dto: UserInfoDto, file: Express.Multer.File): Promise<User> {
    let profileImageUrl = "";

    if (file) {
      const key = `profiles/${dto.id}/${uuid()}.jpg`;
      try {
        const uploadResult = await this.s3.upload({
          Bucket: process.env.AWS_BUCKET_NAME!,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: 'public-read',
        }).promise();

        profileImageUrl = uploadResult.Location; // 파일 위치
      } catch (error) {
        throw new Error('파일 업로드에 실패했습니다: ' + error.message);
      }
    }

    const newUser = this.userRepository.create({
      id: dto.id,
      name: dto.name,
      profile: profileImageUrl,
      message: dto.message,
    });

    return await this.userRepository.save(newUser);
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
