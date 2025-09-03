import { Context } from "src/telegram/interfaces/context.interface";
import { MiddlewareFn, session } from "telegraf";

export const sessionMiddleware: MiddlewareFn<Context> = session();
