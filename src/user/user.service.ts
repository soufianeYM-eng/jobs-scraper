import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserPayload } from './interfaces/register-user.type';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  fetchUserJobAlerts(username: string) {
    return this.prismaService.user.findFirst({
      where: { username },
      include: { jobsAlerts: true },
    });
  }

  async findUser(username: string) {
    const existingUser = await this.prismaService.user.findUnique({
      where: { username },
    });

    if (!existingUser) throw new NotFoundException('User not found!');

    return existingUser;
  }

  async registerUser(userPayload: RegisterUserPayload) {
    const { username, chat, ...rest } = userPayload;
    const findUser = await this.prismaService.user.findUnique({
      where: { username: username },
      include: { chats: true },
    });

    const findChat = findUser?.chats.find((c) => c.id === chat.chatId);
    if (findUser) {
      if (findChat) {
        return findUser;
      } else {
        await this.prismaService.chat.create({
          data: {
            id: chat.chatId,
            createdAt: chat.createdAt,
            type: chat.type,
            userId: findUser.id,
          },
          include: { user: true },
        });

        return this.prismaService.user.findUnique({
          where: { id: findUser.id },
          include: { chats: true },
        });
      }
    }

    return await this.prismaService.user.create({
      data: {
        username,
        ...rest,
        chats: {
          create: {
            id: chat.chatId,
            createdAt: chat.createdAt,
            type: chat.type,
          },
        },
      },
    });
  }
}
