import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';


export class FetchPostsDto {
    @ApiPropertyOptional({
        description: 'Page number for pagination',
        default: 1,
        minimum: 1,
        type: Number,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
        page?: number = 1;

    @ApiPropertyOptional({
        description: 'Number of posts per page',
        default: 10,
        minimum: 1,
        maximum: 100,
        type: Number,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
        limit?: number = 10;

    @ApiPropertyOptional({
        description: 'Field by which to sort posts',
        default: 'createdAt',
        type: String,
    })
    @IsOptional()
    @IsString()
        sortBy?: string = 'createdAt';

    @ApiPropertyOptional({
        description: 'Order direction for sorting (ASC or DESC)',
        default: 'ASC',
        enum: ['ASC', 'DESC'],
    })
    @IsOptional()
    @IsString()
        order?: 'ASC' | 'DESC' = 'ASC';


    @ApiPropertyOptional({
        description: 'Filter criterion for narrowing down posts',
        type: String,
    })
    @IsOptional()
    @IsString()
        filter?: string;
}