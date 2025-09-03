import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJobAlertType } from './interfaces/create-job-alert.type';

@Injectable()
export class JobAlertService {
  constructor(private readonly prismaService: PrismaService) {}

  createJobAlert(jobAlertPayload: CreateJobAlertType) {
    const { keywords, userId, chatId } = jobAlertPayload;
    return this.prismaService.jobAlert.create({
      data: { keywords, userId, chatId, createdAt: new Date() },
    });
  }
}
