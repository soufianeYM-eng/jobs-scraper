import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramUpdate } from './telegram.update';
import { UserService } from 'src/user/user.service';
import { TechStackScene } from './scenes/tech-stack.scene';

@Module({
  providers: [TelegramService, TechStackScene, TelegramUpdate, UserService],
})
export class TelegramModule {}
