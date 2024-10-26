import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {

@ApiProperty({
    example: 'John'
})
  @IsNotEmpty({ message: 'First name is required' })
  @IsString()
    firstName: string;

    @ApiProperty({
        example: 'Doe',
    })
  @IsNotEmpty({ message: 'Last name is required' })
  @IsString()
        lastName: string;

    @ApiProperty({
        example: 'user@example.com',
    })
  @IsEmail({}, { message: 'Invalid email format' })
        email: string;

    @ApiProperty({
        example: 'strongPassword123',
        description: 'The password for the user account, must be at least 4 characters long',
    })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(4, { message: 'Password must be at least 4 characters long' })
        password: string;
}
