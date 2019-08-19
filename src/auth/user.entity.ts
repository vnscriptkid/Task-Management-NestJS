import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import { compare } from 'bcrypt';
import { TaskEntity } from '../tasks/task.entity';

@Entity()
@Unique(['username'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(type => TaskEntity, task => task.user, { eager: true })
  tasks: TaskEntity[];

  async isPasswordCorrect(plainPassword: string): Promise<boolean> {
    return await compare(plainPassword, this.password);
  }
}
