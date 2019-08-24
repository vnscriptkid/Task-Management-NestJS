import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
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

  describe('signIn', () => {
    let checkPasswordMock;
    it('signIn successfully', async () => {
      checkPasswordMock = jest.fn().mockResolvedValue(true);
      userRepository.findOne = jest.fn().mockResolvedValue({
        isPasswordCorrect: checkPasswordMock,
      });
      const result = await userRepository.signIn(authCredentialsDto);
      expect(userRepository.findOne).toHaveBeenCalled();
      expect(checkPasswordMock).toHaveBeenCalled();
      expect(result).toEqual(authCredentialsDto.username);
    });

    it('signIn unsuccessfully in case user not found', async () => {
      userRepository.findOne = jest.fn().mockResolvedValue(null);
      expect(userRepository.signIn(authCredentialsDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('signIn unsuccessfully in case password is not correct', async () => {
      checkPasswordMock = jest.fn().mockResolvedValue(false);
      userRepository.findOne = jest.fn().mockResolvedValue({
        isPasswordCorrect: checkPasswordMock,
      });
      expect(userRepository.signIn(authCredentialsDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
