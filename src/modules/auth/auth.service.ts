import { ConflictException, Injectable } from '@nestjs/common';
import { SignupDTO } from './dto/request';
import { PrismaService } from '../database/prisma.service';
import { hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signup({ email, name, username, password }: SignupDTO): Promise<void> {
    const doesEmailExist = await this.prisma.users.count({
      where: { email },
    });

    if (doesEmailExist) throw new ConflictException('Email already exists.');

    const doesUsernameExist = await this.prisma.users.count({
      where: { username },
    });

    if (doesUsernameExist) throw new ConflictException('Username already exists.');

    const passwordHashed = await hash(password, 8);

    await this.prisma.users.create({
      data: {
        email,
        username,
        name,
        password: passwordHashed,
      },
    });
  }
}
