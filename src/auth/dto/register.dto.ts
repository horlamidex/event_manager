import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterDto {
  @IsString({ message: 'Email must be a string' })
  @IsEmail({ message: 'Email is not valid' })
  email: string;

  @IsString({ message: 'First name must be a string' })
  @Length(3, 50, { message: 'First name must be between 3 and 50 characters' })
  firstName: string;

  @IsString({ message: 'Last name must be a string' })
  @Length(3, 50, { message: 'Last name must be between 3 and 50 characters' })
  lastName: string;

  @IsString({ message: 'Password must be a string' })
  @Length(6, 16, { message: 'Password must be between 6 and 16 characters' })
  password: string;
}
