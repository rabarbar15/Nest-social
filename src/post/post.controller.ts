import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    Request,
    UseGuards,
} from '@nestjs/common';
import { GuardRequest } from 'express';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { FetchPostsDto } from './dto/fetchPosts.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard)
  @ApiResponse({ status: 201, description: 'Post created successfully.', type: PostDto })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Post()
    createPost(@Request() req: GuardRequest, @Body() postDto: PostDto) {
        return this.postService.createPost({
            authorId: req.user.sub,
            title: postDto.title,
            description: postDto.description,
        });
    }

  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Fetched user posts successfully.', type: FetchPostsDto })
  @ApiResponse({ status: 404, description: 'Posts not found.' })
  @Get()
  fetchUsersPosts(@Request() req: GuardRequest, @Query() query: FetchPostsDto) {
      return this.postService.fetchUsersPosts(req.user.sub, query);
  }

  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Post deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  @Delete(':postId')
  deletePost(@Param('postId') postId: number, @Request() req: GuardRequest) {
      return this.postService.deletePost(postId, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Post updated successfully.', type: PostDto })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  @Put(':postId')
  updatePost(
    @Param('postId') postId: string,
    @Request() req: GuardRequest,
    @Body() post: PostDto,
  ) {
      return this.postService.updatePost(
          postId,
          req.user.sub,
          post.title,
          post.description,
      );
  }

  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Fetched all posts successfully.', type: FetchPostsDto })
  @Get('all')
  fetchAllPosts(@Query() fetchPostsDto: FetchPostsDto) {
      return this.postService.fetchAllPosts(fetchPostsDto);
  }

  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Post liked successfully.' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  @ApiResponse({ status: 409, description: 'Post already liked.' })
  @Post(':postId/like')
  likePost(@Param('postId') postId: number, @Request() req: GuardRequest) {
      const userId = parseInt(req.user.sub);
      return this.postService.setLike(postId, userId);
  }

  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Post unliked successfully.' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  @Delete(':postId/like')
  unlikePost(
    @Param('postId') postId: number,
    @Request() req: GuardRequest,
  ) {
      const userId = parseInt(req.user.sub);
      return this.postService.removeLike(postId, userId);
  }
}
