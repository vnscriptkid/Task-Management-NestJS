// For reference only
import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly statusValues = Object.values(TaskStatus);

  async transform(value: string, { metatype }: ArgumentMetadata) {
    console.log(metatype);
    value = value.toUpperCase();
    if (!this.statusValues.includes(value)) {
      throw new BadRequestException(`'${value}' is an invalid status`);
    }
    return value;
  }
}
