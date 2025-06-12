import { Controller, Get, Param } from '@nestjs/common';
import { HomeService } from './home.service';
import { UserInfoDto } from '../user/dto/user-info.dto';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get('user/:id')
  async getUserInfo(@Param('id') userId: string): Promise<UserInfoDto> {
    return this.homeService.getUserInfo(userId);
  }
}
