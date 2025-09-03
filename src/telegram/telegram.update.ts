import { Injectable } from '@nestjs/common';
import { ChatType } from '@prisma/client';
import { InlineKeyboardButton } from '@telegraf/types';
import { Command, Ctx, On, Start, Update } from 'nestjs-telegraf';
import { RegisterUserPayload } from 'src/user/interfaces/register-user.type';
import { UserService } from 'src/user/user.service';
import { Context } from './interfaces/context.interface';

@Injectable()
@Update()
export class TelegramUpdate {
  constructor(private readonly userService: UserService) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    const { chat, message: { date, from } = {} } = ctx;

    const registerUserPayload: RegisterUserPayload = {
      username: from?.username ?? 'Incognito',
      firstName: from?.first_name,
      lastName: from?.last_name,
      chat: {
        chatId: chat?.id.toString() ?? '0000000',
        type: (chat?.type.toUpperCase() as ChatType) ?? ChatType.PRIVATE,
        createdAt: date ? new Date(date * 1000) : new Date(),
      },
    };

    const user = await this.userService.registerUser(registerUserPayload);

    await ctx.reply(
      `👋 Hi ${user?.firstName ?? ''} ${user?.lastName ?? ''}!\nWelcome to your Job Daily Bot.`,
    );

    const keyboard: InlineKeyboardButton[][] = [
      [
        { text: 'Yes', callback_data: 'alert_yes' },
        { text: 'No', callback_data: 'alert_no' },
      ],
    ];

    await ctx.sendMessage(
      'Do you want me to create a daily job alert for you?',
      {
        reply_markup: { inline_keyboard: keyboard },
      },
    );
  }

  @Command('alerts')
  async onAlerts(@Ctx() ctx: Context) {
    const user = await this.userService.fetchUserJobAlerts(
      ctx.message?.from.username as string,
    );
    await ctx.reply(
      user?.jobsAlerts
        .map((a) => {
          const keywords = a.keywords
            .split(',')
            .map((k) => `*${this.escapeMarkdownV2(k.trim())}*`)
            .join(', ');

          const createdAt = this.escapeMarkdownV2(
            new Date(a.createdAt).toLocaleString(),
          );

          // Safe separator (no escaping needed)
          return `🔎 Keywords: ${keywords} ➤ 📅 Creation Date: ${createdAt}`;
        })
        .join('\n') || 'No alerts yet',
      { parse_mode: 'MarkdownV2' },
    );
  }

  @On('callback_query')
  async onCallback(@Ctx() ctx: Context) {
    const callbackQuery = ctx.callbackQuery;

    if (!callbackQuery || !('data' in callbackQuery)) {
      return ctx.answerCbQuery();
    }

    const data = callbackQuery.data;
    await ctx.answerCbQuery();

    if (data === 'alert_yes') {
      // Enter the tech stack scene
      console.warn(ctx);
      return ctx.scene.enter('techStackScene');
    } else if (data === 'alert_no') {
      await ctx.reply(
        'Alright! Anyway, you can create it every time you want!',
      );
    } else {
      await ctx.reply('Unknown option!');
    }
  }

  escapeMarkdownV2(text: string) {
    return text.replace(/([_*\[\]()~`>#+\-=|{}.!])/g, '\\$1');
  }
}
