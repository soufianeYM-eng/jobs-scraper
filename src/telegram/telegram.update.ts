import { Injectable } from '@nestjs/common';
import { Ctx, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Injectable()
@Update()
export class TelegramUpdate {

  @Start()
  onStart(@Ctx() ctx: Context) {
    ctx.reply('Welcome! 👋 Your bot V2 is now ready.');
  }
}
