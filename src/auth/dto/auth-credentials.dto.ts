import { IsNotEmpty, Length } from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
