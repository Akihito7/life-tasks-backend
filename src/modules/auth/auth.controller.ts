import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignlnDTO, SignupDTO } from './dto/request';
import { AuthService } from './auth.service';
import { SignlnResponse } from './dto/response';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user.' })
  @ApiResponse({ status: 204, description: 'User created successfully.' })
  @Post('signup')
  @HttpCode(204)
  async signup(@Body() body: SignupDTO): Promise<void> {
    const data = body;
    return this.authService.signup(data);
  }

  @ApiOperation({ summary: 'Login with your account.' })
  @ApiResponse({ status: 200, description: 'Should return token jwt.' })
  @Post('signln')
  @HttpCode(200)
  async signln(@Body() body: SignlnDTO): Promise<SignlnResponse> {
    const data = body;
    return this.authService.signln(data);
  }
}
