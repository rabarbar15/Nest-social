import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty({ message: 'First name is required' })
  @IsString()
      firstName: string;

  @IsNotEmpty({ message: 'Last name is required' })
  @IsString()
      lastName: string;

  @IsEmail({}, { message: 'Invalid email format' })
      email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(4, { message: 'Password must be at least 4 characters long' })
      password: string;
}
