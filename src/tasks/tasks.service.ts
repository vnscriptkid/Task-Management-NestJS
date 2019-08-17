import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getTasksWithFilters(filter?: GetTasksFilterDto) {
    let search, status;
    if (filter) {
      search = filter.search;
      status = filter.status;
    }
    let taskList = this.tasks;
    if (status) {
      taskList = taskList.filter(t => t.status === status);
    }
    if (search) {
      taskList = taskList.filter(
        t => t.title.includes(search) || t.description.includes(search),
      );
    }
    return taskList;
  }

  getTaskById(id: string): Task | null {
    return this.tasks.find(t => t.id === id);
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
