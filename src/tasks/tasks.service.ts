import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { UserEntity } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  public async getTaskById(id: number, userId: number): Promise<TaskEntity> {
    const foundTask = await this.taskRepository.findOne({ id, userId });
    if (!foundTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return foundTask;
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    user: UserEntity,
  ): Promise<TaskEntity> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async deleteTask(id: number): Promise<void> {
    // First way
    // const task = await this.getTaskById(id);
    // await task.remove();

    // Second way
    // const result = await this.taskRepository.delete(id);
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }

  // async updateTaskStatus(id: number, status: TaskStatus): Promise<TaskEntity> {
  //   const task = await this.getTaskById(id);
  //   task.status = status;
  //   await task.save();
  //   return task;
  // }

  async getTasks(
    getTaskFilterDto: GetTasksFilterDto,
    user: UserEntity,
  ): Promise<TaskEntity[]> {
    const tasks = await this.taskRepository.getTasks(getTaskFilterDto, user);
    return tasks;
  }

  // private tasks: Task[] = [];
  // getAllTasks() {
  //   return this.tasks;
  // }
  // getTasksWithFilters(filter: GetTasksFilterDto) {
  //   const { status, search } = filter;
  //   let taskList = this.tasks;
  //   if (status) {
  //     taskList = taskList.filter(t => t.status === status);
  //   }
  //   if (search) {
  //     taskList = taskList.filter(
  //       t => t.title.includes(search) || t.description.includes(search),
  //     );
  //   }
  //   return taskList;
  // }
  // getTaskById(id: string): Task {
  //   const foundTask = this.tasks.find(t => t.id === id);
  //   if (!foundTask) {
  //     throw new NotFoundException('Task not found');
  //   }
  //   return foundTask;
  // }
  // createTask(createTaskDto: CreateTaskDto) {
  //   const { title, description } = createTaskDto;
  //   const newTask: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(newTask);
  //   return newTask;
  // }
  // deleteTask(id: string) {
  //   const task = this.getTaskById(id);
  //   this.tasks = this.tasks.filter(t => t.id !== task.id);
  // }
  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
