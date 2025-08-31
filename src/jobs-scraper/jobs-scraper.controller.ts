import { Controller, Get } from '@nestjs/common';
import { JobsScraperService } from './jobs-scraper.service';

@Controller('jobs')
export class JobsScraperController {
  constructor(private readonly jobsScraperService: JobsScraperService) {}

  @Get('askMe')
  askMe(){
    return this.jobsScraperService.askMe(1105263406, 'Hello! I am your bot.');
  }
  
}
