import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getTaskById(id: string): Task | null {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return null;
    return task;
  }

  createTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  deleteTask(id: string) {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const taskToUpdate = this.tasks.find(t => t.id === id);
    taskToUpdate.status = status;
    return taskToUpdate;
  }
}
