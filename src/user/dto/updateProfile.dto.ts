import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'First name is required' })
      firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Last name is required' })
      lastName: string;
}
