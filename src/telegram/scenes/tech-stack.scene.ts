import { Injectable } from '@nestjs/common';
import { Scene, SceneEnter, On, Ctx } from 'nestjs-telegraf';
import { Context } from '../interfaces/context.interface';
import { JobAlertService } from 'src/job-alert/job-alert.service';
import { UserService } from 'src/user/user.service';

@Scene('techStackScene')
@Injectable()
export class TechStackScene {
  constructor(
    private readonly jobAlertService: JobAlertService,
    private readonly userService: UserService,
  ) {}

  @SceneEnter()
  async onEnter(@Ctx() ctx: Context) {
    await ctx.reply(
      'Can you give me your tech stack separated with a comma please?',
    );
  }

  @On('text')
  async onText(@Ctx() ctx: Context): Promise<any> {
    const { chat, message } = ctx;

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

    try {
      // Find The user
      const user = await this.userService.findUser(
        message?.from.username as string,
      );
      const chatId = chat?.id.toString() ?? '0000000';
      await this.jobAlertService.createJobAlert({
        userId: user.id,
        chatId,
        keywords: text,
      });
      await ctx.reply(`Your job alert with the keywords ${keywords.join(', ')} is created successfully 🎉!`);
    } catch (err) {

      console.warn(err.message)
      await ctx.reply(
        'Theres an issue when creating your job alert, can you try later or contact our support!',
      );
    }

    return ctx.scene.leave();
  }
}
