import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, IsDate, Min } from 'class-validator';

export class UserPostLikesDto {
    @IsInt()
    @Min(1)
        userId: number;

    @IsString()
    @IsNotEmpty()
        firstName: string;

    @IsString()
    @IsNotEmpty()
        lastName: string;

    @IsEmail()
        email: string;

    @IsInt()
    @Min(1)
        postId: number;

    @IsString()
    @IsNotEmpty()
        postTitle: string;

    @IsString()
    @IsOptional()
        postDescription: string;

    @IsDate()
        postCreatedDate: Date;

    @IsInt()
    @Min(0) 
        likesCount: number;
}
