import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { GetUserByIdResponse } from './dto/response';

@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Return a user.' })
  @ApiResponse({ status: 200, description: 'get a user by id and return' })
  @Get('/')
  async getUserById(@Req() req): Promise<GetUserByIdResponse> {
    return this.usersService.getUserById(req.user.id);
  }
}
