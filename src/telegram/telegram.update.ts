import { Injectable } from '@nestjs/common';
import { Ctx, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Injectable()
@Update()
export class TelegramUpdate {

  @Start()
  async onStart(@Ctx() ctx: Context) {
    const chat = await ctx.reply('Welcome! 👋 Your bot V2 is now ready.');
  }
}
