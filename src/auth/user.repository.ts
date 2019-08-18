import { Repository, EntityRepository } from 'typeorm';
import { UserEntity } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import bcrypt from 'bcrypt';

const saltRounds = 10;

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const newUser = new UserEntity();
    newUser.username = username;
    const hash = bcrypt.hashSync(password, saltRounds);
    newUser.password = hash;
    try {
      await newUser.save();
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException(`Username '${username}' already exists`);
      } else {
        throw new InternalServerErrorException(); // 500
      }
    }
  }
}
