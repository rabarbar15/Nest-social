import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PostDto {
@ApiProperty({
    description: 'Title of the post',
    example: 'My First Post',
})
  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
    title: string;

    @ApiProperty({
        description: 'Description of the post',
        example: 'This is the description for my first post',
    })
  @IsNotEmpty({ message: 'Description name is required' })
  @IsString()
        description: string;
}
