import { ConflictException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('Auth Controller Tests', () => {
  let prismaService: PrismaService;
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(() => {
    prismaService = new PrismaService();
    authService = new AuthService(prismaService);
    authController = new AuthController(authService);
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
      try {
        await authService.signup(userDTO);
      } catch (error) {
        await expect(authService.signup(userDTO)).rejects.toThrow(
          ConflictException,
        );

        await expect(authService.signup(userDTO)).rejects.toThrow(
          'Username already exists.',
        );
      }
    });
  });

  afterEach(async () => {
    await prismaService.$transaction([prismaService.users.deleteMany()]);
  });
});
