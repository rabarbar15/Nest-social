import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';


export class FetchPostsDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
        page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
        limit?: number = 10;

    @IsOptional()
    @IsString()
        sortBy?: string = 'createdAt';

    @IsOptional()
    @IsString()
        order?: 'ASC' | 'DESC' = 'ASC';
    
    @IsOptional()
    @IsString()
        filter?: string;
}