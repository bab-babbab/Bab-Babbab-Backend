import { Controller, Post, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UserService } from './user.service';
import { UserInfoDto } from './dto/user-info.dto';
import { SchoolInfoDto } from './dto/school-info.dto';
import * as fs from 'fs';

const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const generateFilename = (originalname: string) => {
  const ext = extname(originalname);
  const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  return `${unique}${ext}`;
};

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user-info')
  @UseInterceptors(
    FileInterceptor('profile', {
      storage: diskStorage({
        destination: uploadDir,
        filename: (req, file, cb) => {
          const uniqueName = generateFilename(file.originalname);
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async saveUserInfo(@UploadedFile() file: Express.Multer.File, @Body() body: UserInfoDto) {
    const dto: UserInfoDto = {
      ...body,
      profile: file?.filename || '',
    };

    return this.userService.saveUserInfo(dto);
  }

  @Post('school-info')
  async saveSchoolInfo(@Body() dto: SchoolInfoDto) {
    return this.userService.saveSchoolInfo(dto);
  }
}
