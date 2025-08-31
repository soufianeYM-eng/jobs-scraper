import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { type Context, Telegraf } from 'telegraf';

@Injectable()
export class JobsScraperService {
  constructor(@InjectBot() private bot: Telegraf<Context>) {}

  async askMe(chatId: number, text: string) {
    await this.bot.telegram.sendMessage(chatId, text);
  }
}
