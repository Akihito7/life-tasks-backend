import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignlnDTO, SignupDTO } from './dto/request';
import { PrismaService } from '../database/prisma.service';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignlnResponse } from './dto/response';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async signup({ email, name, username, password }: SignupDTO): Promise<void> {
    const doesEmailExist = await this.prisma.users.count({
      where: { email },
    });

    if (doesEmailExist) throw new ConflictException('Email already exists.');

    const doesUsernameExist = await this.prisma.users.count({
      where: { username },
    });

    if (doesUsernameExist)
      throw new ConflictException('Username already exists.');

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

  async signln({ email, password }: SignlnDTO): Promise<SignlnResponse> {
    const user = await this.prisma.users.findFirst({
      where: { email },
    });

    if (!user) throw new UnauthorizedException('Invalid Credentials');

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new UnauthorizedException('Invalid Credentials');

    const token = this.jwt.sign(
      {},
      {
        subject: String(user.id),
      },
    );

    return {
      token, 
    };
  }
}
