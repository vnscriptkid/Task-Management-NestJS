import { IsNotEmpty, Length, Matches } from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty()
  @Length(4, 20)
  username: string;

  @IsNotEmpty()
  @Length(6, 20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain at least 1 upper case letter, 1 lower case letter, 1 number or special character',
  })
  password: string;
}
