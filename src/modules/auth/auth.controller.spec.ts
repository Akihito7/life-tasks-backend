import {
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

describe('Auth Controller Tests', () => {
  let jwtService: JwtService;
  let prismaService: PrismaService;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: '16212944',
          signOptions: { expiresIn: '1h' },
        }),
      ],
      providers: [AuthService, PrismaService],
      controllers: [AuthController],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
    authService = module.get<AuthService>(AuthService);
  });

  describe('Signup', () => {
    it('should create user.', async () => {
      const userDTO = {
        id: 1,
        name: 'Guilherme Akihito',
        email: 'akihitopro23@gmail.com',
        username: 'guilherme',
        password: 'admin123',
      };
      await authService.signup(userDTO);

      const userCreated = await prismaService.users.findFirst({
        where: { email: userDTO.email },
      });

      expect(userCreated).toHaveProperty('id');
    });

    it("shouldn't create user with same email", async () => {
      const userDTO = {
        id: 1,
        name: 'Guilherme Akihito',
        email: 'akihitopro7@gmail.com',
        username: 'akihito7',
        password: 'admin123',
      };
      await authService.signup(userDTO);
      try {
        await authService.signup(userDTO);
      } catch (error) {
        await expect(authService.signup(userDTO)).rejects.toThrow(
          ConflictException,
        );

        await expect(authService.signup(userDTO)).rejects.toThrow(
          'Email already exists.',
        );
      }
    });

    it("shouldn't create user with same username", async () => {
      const userDTO = {
        id: 1,
        name: 'Guilherme Akihito',
        email: 'akihitopro22@gmail.com',
        username: 'akihito7',
        password: 'admin123',
      };
      await authService.signup({
        ...userDTO,
        email: 'akihito@gmail.com',
      });

      await expect(authService.signup(userDTO)).rejects.toThrow(
        ConflictException,
      );
      await expect(authService.signup(userDTO)).rejects.toThrow(
        'Username already exists.',
      );
    });
  });

  describe('Signln', () => {
    it('Should return token', async () => {
      const userSignupDTO = {
        id: 1,
        name: 'Guilherme Akihito',
        email: 'akihitopro22@gmail.com',
        username: 'akihito',
        password: 'admin123',
      };

      const userSignlnDTO = {
        email: 'akihitopro22@gmail.com',
        password: 'admin123',
      };

      await authService.signup(userSignupDTO);

      const response = await authService.signln(userSignlnDTO);

      expect(response).toHaveProperty('token');
      expect(response.token).toMatch(
        /^[A-Za-z0-9-_=]+\.([A-Za-z0-9-_=]+)\.([A-Za-z0-9-_=]+)?$/,
      );
    });

    it('Should throw error credentials', async () => {
      const userSignupDTO = {
        id: 1,
        name: 'Guilherme Akihito',
        email: 'akihitopro22@gmail.com',
        username: 'akihito',
        password: 'admin123',
      };

      const userSignlnDTO = {
        email: 'akihitopro21@gmail.com',
        password: 'admin123',
      };

      await authService.signup(userSignupDTO);

      await expect(authService.signln(userSignlnDTO)).rejects.toThrow(
        UnauthorizedException,
      );
      await expect(authService.signln(userSignlnDTO)).rejects.toThrow(
        'Invalid Credentials',
      );
    });
  });

  afterEach(async () => {
    await prismaService.$transaction([prismaService.users.deleteMany()]);
  });
});
