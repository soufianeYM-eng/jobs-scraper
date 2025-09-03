import { Module } from '@nestjs/common';
import { JobAlertService } from './job-alert.service';

@Module({
  providers: [JobAlertService],
})
export class JobAlertModule {}
