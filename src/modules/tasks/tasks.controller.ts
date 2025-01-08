import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { AddTaskRequestDTO } from './dto/request';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('tasks')
@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @ApiOperation({ summary: 'Get tasks.' })
  @ApiResponse({ status: 200, description: 'Should get all tasks.' })
  @Get()
  async getManyTasks() {}

  @ApiOperation({ summary: 'Get unique task.' })
  @ApiResponse({ status: 200, description: 'Should get task by id.' })
  @Get('/:taskId')
  async getTaskById() {}

  @ApiOperation({ summary: 'Create task.' })
  @ApiResponse({ status: 200, description: 'Should create a task.' })
  @Post()
  @HttpCode(201)
  async addTask(@Body() body: AddTaskRequestDTO): Promise<void> {
    const data = body;
    return this.taskService.addTask(data);
  }
}
