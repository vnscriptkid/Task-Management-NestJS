import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  const authCredentialsDto: AuthCredentialsDto = {
    username: 'thanh',
    password: '123',
  };
  const saveMock = jest.fn();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();
    userRepository = app.get<UserRepository>(UserRepository);
    userRepository.create = jest.fn().mockReturnValue({ save: saveMock });
  });

  describe('signUp', () => {
    it('should call create() method, save all POST data', async () => {
      saveMock.mockResolvedValue(undefined);
      expect(userRepository.create).not.toHaveBeenCalled();
      await userRepository.signUp(authCredentialsDto);
      expect(userRepository.create).toHaveBeenCalled();
      expect(saveMock).toHaveBeenCalled();
    });

    it('should throw Conflict in case error code is 23505', async () => {
      saveMock.mockRejectedValue({ code: '23505' });
      expect(userRepository.signUp(authCredentialsDto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throw Internal Server Error in other case', async () => {
      saveMock.mockRejectedValue({});
      expect(userRepository.signUp(authCredentialsDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
