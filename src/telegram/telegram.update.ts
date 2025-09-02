import { Injectable } from '@nestjs/common';
import { ChatType } from '@prisma/client';
import { InlineKeyboardButton } from '@telegraf/types';
import { Ctx, On, Start, Update } from 'nestjs-telegraf';
import { RegisterUserPayload } from 'src/user/interfaces/register-user.type';
import { UserService } from 'src/user/user.service';
import { Context } from 'telegraf';

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
    ctx.reply(
      `👋 Hi ${user?.firstName ?? ''} ${user?.lastName ?? ''} ! \n Welcome to your Job Daily Bot. How can I help you find your next opportunity?`,
    );

    const keyboard: InlineKeyboardButton[][] = [
      [
        { text: 'Daily Job Alerts', callback_data: 'daily_alerts' },
        { text: 'Monthly Job Alerts', callback_data: 'monthly_alerts' },
      ],
    ];

    ctx.sendMessage('Can you choose one option', {
      reply_markup: { inline_keyboard: keyboard },
    });
  }

  @On('callback_query')
  async on(@Ctx() ctx: Context) {
    const callbackQuery = ctx.callbackQuery;

    // Make sure it is a regular callback query, not a GameQuery
    if (!callbackQuery || !('data' in callbackQuery)) {
      return ctx.answerCbQuery(); // nothing to do
    }

    const data = callbackQuery.data;

    if (data === 'daily_alerts') {
      ctx.answerCbQuery();
      ctx.reply('You have chosen Daily Job Alerts!');
    } else if (data === 'monthly_alerts') {
      ctx.answerCbQuery();
      ctx.reply('You have chosen Monthly Job Alerts!');
    } else {
      ctx.answerCbQuery();
      ctx.reply('Unknown option!');
    }
  }
}
