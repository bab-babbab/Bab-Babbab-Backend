import { Controller, Get, Param } from '@nestjs/common';
import { HomeService } from './home.service';
import { UserProfileDto } from '../user/dto/user-profile.dto';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get('user/:id')
  async getUserInfo(@Param('id') userId: string): Promise<UserProfileDto> {
    return this.homeService.getUserInfo(userId);
  }
}
