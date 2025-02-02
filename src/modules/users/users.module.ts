import { Global, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../database/prisma.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
