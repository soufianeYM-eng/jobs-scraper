import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramUpdate } from './telegram.update';
import { UserService } from 'src/user/user.service';
import { TechStackScene } from './scenes/tech-stack.scene';
import { JobAlertService } from 'src/job-alert/job-alert.service';

@Module({
  providers: [TelegramService, TechStackScene, TelegramUpdate, UserService, JobAlertService],
})
export class TelegramModule {}
