import { Controller } from '@nestjs/common';
import { JobsScraperService } from './jobs-scraper.service';

@Controller('jobs')
export class JobsScraperController {
  constructor(private readonly jobsScraperService: JobsScraperService) {}
}
