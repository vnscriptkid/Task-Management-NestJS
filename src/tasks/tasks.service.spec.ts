import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
  createTask: jest.fn(),
  delete: jest.fn(),
});

const user: any = {
  id: 123,
};

describe('TasksService', () => {
  let tasksService: TasksService;
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

  describe('getTaskById', () => {
    const taskId = 100;
    const userId = 200;

    it('calls findOne from taskRepository and return that result', async () => {
      (taskRepository.findOne as jest.Mock).mockResolvedValue('single task');
      expect(taskRepository.findOne).not.toHaveBeenCalled();
      const result = await tasksService.getTaskById(taskId, userId);
      expect(taskRepository.findOne).toHaveBeenCalledWith({
        id: taskId,
        userId,
      });
      expect(result).toEqual('single task');
    });

    it('throw NotFound exception in case findOne return nothing', async () => {
      (taskRepository.findOne as jest.Mock).mockReturnValue(undefined);
      expect(tasksService.getTaskById(taskId, userId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createTask', () => {
    const createTaskDto: CreateTaskDto = {
      title: 'code',
      description: 'practice',
    };
    it('should call createTask from taskRepository and return the result', async () => {
      (taskRepository.createTask as jest.Mock).mockResolvedValue('new task');
      expect(taskRepository.createTask).not.toHaveBeenCalled();
      const result = await tasksService.createTask(createTaskDto, user);
      expect(result).toEqual('new task');
    });
  });

  describe('deleteTask', () => {
    const taskId = 100;
    const userId = 200;
    it('should call delete from taskRepository and return undefined in case of success', async () => {
      (taskRepository.delete as jest.Mock).mockResolvedValue({ affected: 1 });
      expect(taskRepository.delete).not.toHaveBeenCalled();
      const result = await tasksService.deleteTask(taskId, userId);
      expect(taskRepository.delete).toHaveBeenCalledWith({
        id: taskId,
        userId,
      });
      expect(result).toEqual(undefined);
    });

    it('should throw NotFound in case of failure', async () => {
      (taskRepository.delete as jest.Mock).mockResolvedValue({ affected: 0 });
      expect(tasksService.deleteTask(taskId, userId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateTaskStatus', () => {
    const taskId = 100;
    const status = TaskStatus.IN_PROGRESS;
    const userId = 200;
    it('should call getTaskById to get a task, change status and save it', async () => {
      const mockSave = jest.fn();
      tasksService.getTaskById = jest.fn().mockResolvedValue({
        status: TaskStatus.IN_PROGRESS,
        save: mockSave,
      });
      expect(tasksService.getTaskById).not.toHaveBeenCalled();
      const result = await tasksService.updateTaskStatus(
        taskId,
        status,
        userId,
      );
      expect(mockSave).toHaveBeenCalled();
      expect(result.status).toEqual(TaskStatus.IN_PROGRESS);
    });
  });
});
