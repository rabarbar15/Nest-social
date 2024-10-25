import { IsNotEmpty, IsString } from 'class-validator';

export class PostDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
      title: string;

  @IsNotEmpty({ message: 'Description name is required' })
  @IsString()
      description: string;
}
