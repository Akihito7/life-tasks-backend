import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { AddTaskRequestDTO } from './dto/request';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async addTask(data: AddTaskRequestDTO): Promise<void> {
    const { user_id, ...rest } = data;
    try {
      await this.prisma.tasks.create({
        data: {
          users: {
            connect: { id: user_id },
          },
          ...rest,
        },
      });
    } catch (error) {
      console.error('Task Services - Func addTask -> ', error);
      throw new BadRequestException('Could not create the item.');
    }
  }
}
