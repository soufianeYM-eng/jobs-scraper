import { ChatType, Prisma } from '@prisma/client';

interface RegisterChatPayload {
  chatId: string;
  type: ChatType;
  createdAt: Date;
}

export interface RegisterUserPayload extends Prisma.UserCreateInput {
  chat: RegisterChatPayload;
}
