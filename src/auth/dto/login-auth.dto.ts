import { IsEmail, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'Email must be a string' })
  @IsEmail({ message: 'Email is not valid' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @Length(6, 16, { message: 'Password must be between 6 and 16 characters' })
  password: string;
}
