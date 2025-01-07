import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PropsEnv } from 'src/configs/type-env';
import { PrismaService } from '../database/prisma.service';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService<PropsEnv>) {
        return {
          secret: config.get<string>('SECRET_KEY'),
          signOptions: {
            expiresIn: config.get<string>('JWT_EXPIRATION_TIME'),
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
