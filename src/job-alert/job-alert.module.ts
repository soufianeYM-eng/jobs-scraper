import { Module } from '@nestjs/common';
import { JobAlertService } from './job-alert.service';
import { JobAlertController } from './job-alert.controller';

@Module({
  controllers: [JobAlertController],
  providers: [JobAlertService],
})
export class JobAlertModule {}
