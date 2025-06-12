import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { UserService } from './user.service';
import { UserInfoDto } from './dto/user-info.dto';
import { SchoolInfoDto } from './dto/school-info.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('user-info')
  @UseInterceptors(
    FileInterceptor('profile', {
      storage: memoryStorage(), // 메모리 저장
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB 제한
    }),
  )
  async saveUserInfo(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UserInfoDto,
  ) {
    return this.userService.saveUserInfo(body, file);
  }

  @Post('school-info')
  async saveSchoolInfo(@Body() dto: SchoolInfoDto) {
    return this.userService.saveSchoolInfo(dto);
  }
}
