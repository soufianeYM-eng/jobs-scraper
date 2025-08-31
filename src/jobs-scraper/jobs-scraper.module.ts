import { Module } from '@nestjs/common';
import { JobsScraperService } from './jobs-scraper.service';
import { JobsScraperController } from './jobs-scraper.controller';

@Module({
  controllers: [JobsScraperController],
  providers: [JobsScraperService],
})
export class JobsScraperModule {}
