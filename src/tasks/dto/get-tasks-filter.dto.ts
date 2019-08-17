import { TaskStatus } from '../task.model';
import { IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class GetTasksFilterDto {
  @IsOptional()
  @IsIn(Object.values(TaskStatus))
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
