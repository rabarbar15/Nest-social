import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDto {
@ApiProperty({
    example: 'user@example.com'
})
  @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @ApiProperty({
        example: 'strongPassword123',
    })
  @IsNotEmpty({ message: 'Password is required' })
        password: string;
}
