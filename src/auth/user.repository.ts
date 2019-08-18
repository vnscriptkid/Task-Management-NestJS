import { Repository, EntityRepository } from 'typeorm';
import { UserEntity } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const newUser = new UserEntity();
    newUser.username = username;
    newUser.password = password;
    await newUser.save();
  }
}
