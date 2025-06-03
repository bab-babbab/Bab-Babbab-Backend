import { Controller, Body, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserInfoDto } from './dto/user-info.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('info')
  async upsertUser(@Body() userInfoDto: UserInfoDto) {
    return await this.userService.upsertUserInfo(userInfoDto);
  }
}
