import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
} from 'typeorm';
import { compare } from 'bcrypt';

@Entity()
@Unique(['username'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  async isPasswordCorrect(plainPassword: string): Promise<boolean> {
    return await compare(plainPassword, this.password);
  }
}
