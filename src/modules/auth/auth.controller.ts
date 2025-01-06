import {
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignupDTO } from './dto/request';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user.' })
  @ApiResponse({ status: 204, description: 'User created successfully.' })
  @Post('signup')
  @HttpCode(204)
  async signup(@Body() body: SignupDTO) {
    const data = body;
    return this.authService.signup(data);
  }
}
