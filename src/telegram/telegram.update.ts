import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Ctx, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

@Injectable()
@Update()
export class TelegramUpdate {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    const chat = await ctx.reply('Welcome! 👋 Your bot V2 is now ready.');
  }
}
