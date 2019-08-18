import { Repository, EntityRepository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';

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
}
