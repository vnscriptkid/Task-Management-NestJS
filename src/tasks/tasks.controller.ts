import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskEntity } from './task.entity';
import { UpdateTaskStatusDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { UserEntity } from '../auth/user.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/:id')
  @UseGuards(AuthGuard())
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: UserEntity,
  ): Promise<TaskEntity> {
    return this.tasksService.getTaskById(id, user.id);
  }

  @Get()
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  getTasks(
    @GetUser() user: UserEntity,
    @Query() getTasksFilterDto?: GetTasksFilterDto,
  ): Promise<TaskEntity[]> {
    return this.tasksService.getTasks(getTasksFilterDto, user);
  }

  @Post()
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: UserEntity,
  ): Promise<TaskEntity> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: UserEntity,
  ): Promise<void> {
    return this.tasksService.deleteTask(id, user.id);
  }

  @Patch('/:id/status')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: UserEntity,
    // @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<TaskEntity> {
    return this.tasksService.updateTaskStatus(
      id,
      updateTaskStatusDto.status,
      user.id,
    );
    // return this.tasksService.updateTaskStatus(id, status);
  }
}
