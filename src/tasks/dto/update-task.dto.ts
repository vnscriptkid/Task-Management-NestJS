import { IsNotEmpty, IsString, IsIn } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class UpdateTaskStatusDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(TaskStatus))
  status: TaskStatus;
}
