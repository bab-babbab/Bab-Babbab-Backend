import { Controller, Get, Query } from "@nestjs/common";
import { StatsService } from './stats.service';

@Controller('stats/posts')
export class StatsController{
    constructor(private readonly statsService : StatsService) {}
    @Get('daily')
    async getDailyPostCount() {
        return this.statsService.getDailyPostCount();
    }
}