import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  async getTaskById(id: number): Promise<TaskEntity> {
    const foundTask = await this.taskRepository.findOne(id);
    if (!foundTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return foundTask;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.taskRepository.createTask(createTaskDto);
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
