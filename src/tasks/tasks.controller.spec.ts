import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

const initialTasks: CreateTaskDto[] = [
  { title: 'Clean table', description: 'make it awesome' },
  { title: 'Cook dinner', description: 'make it great' },
  { title: 'Coding', description: 'Become great in coding' },
];

describe('TasksController', () => {
  let tasksController: TasksController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();

    // tasksController = app.get<TasksController>(TasksController);
    // initialTasks.forEach(task => {
    //   tasksController.createTask(task);
    // });
  });

  // describe('getTasks', () => {
  //   it('getTasks with no args should return an array with all provided tasks', () => {
  //     const result: Task[] = tasksController.getTasks();
  //     expect(Array.isArray(result)).toEqual(true);
  //     expect(result).toHaveLength(3);
  //   });

  //   it('should returns filtered tasks depending on args provided', () => {
  //     const filterDto: GetTasksFilterDto = {
  //       status: TaskStatus.OPEN,
  //       search: 'make',
  //     };
  //     const result: Task[] = tasksController.getTasks(filterDto);
  //     expect(result).toHaveLength(2);
  //   });
  // });
});
