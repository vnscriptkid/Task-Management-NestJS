import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
});

const user: any = {
  id: 123,
};

describe('TasksService', () => {
  let tasksService;
  let taskRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();
    tasksService = await app.get<TasksService>(TasksService);
    taskRepository = await app.get<TaskRepository>(TaskRepository);
  });

  describe('getTasks', () => {
    it('get all tasks from repository', async () => {
      (taskRepository.getTasks as jest.Mock).mockResolvedValue('got it');
      const getTasksFilterDto: GetTasksFilterDto = {
        search: 'do',
        status: TaskStatus.DONE,
      };
      expect(taskRepository.getTasks).not.toHaveBeenCalled();
      const result = await tasksService.getTasks(getTasksFilterDto, user);
      expect(taskRepository.getTasks).toHaveBeenCalledWith(
        getTasksFilterDto,
        user.id,
      );
      expect(result).toEqual('got it');
    });
  });
});
