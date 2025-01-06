import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignupDTO } from './dto/request';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @ApiOperation({ summary: 'Register a new user.' })
  @ApiResponse({ status: 204, description: 'User created successfully.' })
  @Post('signup')
  @HttpCode(204)
  async signup(@Body() body: SignupDTO) {
    return;
  }
}
