import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { GetUserByIdResponse } from './dto/response';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserById(userId: number): Promise<GetUserByIdResponse> {
    const user = await this.prisma.users.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        username: true,
        created_at: true,
      },
    });

    if (!user) throw new NotFoundException();

    return user;
  }
}
