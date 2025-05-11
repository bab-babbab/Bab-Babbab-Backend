import { Controller, Get, Param } from "@nestjs/common";
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController{
    constructor(private readonly statsService : StatsService) {}
    @Get('daily/:userId')
    async getDailyPostCount(@Param('userId') userId : string) : Promise<{ date: string; count: number }[]>{
        return this.statsService.getDailyPostCount(userId);
    }
    @Get('sequence/:userId')
    async getSequenceDayCount(@Param('userId') userId : string) : Promise<number> {
        return this.statsService.getPhotoStreak(userId);
    }
}