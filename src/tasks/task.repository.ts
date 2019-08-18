import { Repository, EntityRepository, FindManyOptions, Like } from 'typeorm';
import { TaskEntity } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
  async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const { title, description } = createTaskDto;
    const newTask = new TaskEntity();
    newTask.description = description;
    newTask.title = title;
    newTask.status = TaskStatus.OPEN;
    await newTask.save();
    return newTask;
  }

  async getTasks(getTasksFilterDto: GetTasksFilterDto): Promise<TaskEntity[]> {
    const { search, status } = getTasksFilterDto;

    const options: FindManyOptions = {};
    if (search) {
      options.where = [
        { title: Like(`%${search}%`) },
        { description: Like(`%${search}%`) },
      ];
    }
    if (status) {
      options.where = { status };
    }
    const tasks = await this.find(options);
    return tasks;
  }
}
