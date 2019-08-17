import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly statusValues = Object.values(TaskStatus);

  transform(value: string, metadata: ArgumentMetadata) {
    value = value.toUpperCase();
    if (!this.statusValues.includes(value)) {
      throw new BadRequestException(`'${value}' is an invalid status`);
    }
    return value;
  }
}
