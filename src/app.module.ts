import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JobsScraperModule } from './jobs-scraper/jobs-scraper.module';
import { TelegramModule } from './telegram/telegram.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { sessionMiddleware } from './middleware/session.middleware';
import { JobAlertModule } from './job-alert/job-alert.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        token: configService.get<string>('TELEGRAM_BOT_TOKEN') ?? '',
        middlewares: [sessionMiddleware]
      }),
    }),
    JobsScraperModule,
    TelegramModule,
    UserModule,
    PrismaModule,
    JobAlertModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
