import { Injectable } from '@nestjs/common';
import { Scene, SceneEnter, On, Ctx } from 'nestjs-telegraf';
import { Context } from '../interfaces/context.interface';

@Scene('techStackScene')
@Injectable()
export class TechStackScene {
  @SceneEnter()
  async onEnter(@Ctx() ctx: Context) {
    await ctx.reply(
      'Can you give me your tech stack separated with a comma please?',
    );
  }

  @On('text')
  async onText(@Ctx() ctx: Context): Promise<any> {
    const message = ctx.message;

    if (!message || !('text' in message)) {
      return ctx.reply(
        'Please send a text message containing your tech stack.',
      );
    }

    const text = message.text.trim();
    const keywords = text
      .split(',')
      .map((k) => k.trim())
      .filter((k) => k.length > 0);

    await ctx.reply(`Got it! Your keywords are: ${keywords.join(', ')}`);

    return ctx.scene.leave();
  }
}
