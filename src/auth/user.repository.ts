import { Repository, EntityRepository } from 'typeorm';
import { UserEntity } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';

const saltRounds = 10;

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const newUser = new UserEntity();
    newUser.username = username;
    const salt = await genSalt(saltRounds);
    const hashedPassword = await hash(password, salt);
    newUser.password = hashedPassword;
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

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto;
    const foundUser = await this.findOne({ username });
    if (!foundUser || !(await foundUser.isPasswordCorrect(password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return username;
  }
}
