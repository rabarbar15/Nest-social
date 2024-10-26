import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, IsDate, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserPostLikesDto {
    @ApiProperty()
    @IsInt()
    @Min(1)
        userId: number;

    @ApiProperty({ example: 'Adam' })
    @IsString()
    @IsNotEmpty()
        firstName: string;

    @ApiProperty({ example: 'Mickie' })
    @IsString()
    @IsNotEmpty()
        lastName: string;

    @ApiProperty({ example: 'mickie@gmail.com' })
    @IsEmail()
        email: string;

    @ApiProperty()
    @IsInt()
    @Min(1)
        postId: number;

    @ApiProperty({ description: 'The title of the post', example: 'My First Post' })
    @IsString()
    @IsNotEmpty()
        postTitle: string;

    @ApiProperty({ description: 'The description of the post', example: 'This is the description of my first post', required: false })
    @IsString()
    @IsOptional()
        postDescription: string;

    @ApiProperty({ description: 'The creation date of the post', example: '2024-01-01T00:00:00.000Z' })
    @IsDate()
        postCreatedDate: Date;

    @ApiProperty({ description: 'The count of likes for the post', example: 10 })
    @IsInt()
    @Min(0) 
        likesCount: number;
}
