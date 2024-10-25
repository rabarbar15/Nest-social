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

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard)
  @Post()
    createPost(@Request() req: GuardRequest, @Body() postDto: PostDto) {
        return this.postService.createPost({
            authorId: req.user.sub,
            title: postDto.title,
            description: postDto.description,
        });
    }

  @UseGuards(AuthGuard)
  @Get()
  fetchUsersPosts(@Request() req: GuardRequest, @Query() query: FetchPostsDto) {
      return this.postService.fetchUsersPosts(req.user.sub, query);
  }

  @UseGuards(AuthGuard)
  @Delete(':postId')
  deletePost(@Param('postId') postId: number, @Request() req: GuardRequest) {
      return this.postService.deletePost(postId, req.user.sub);
  }

  @UseGuards(AuthGuard)
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
  @Get('all')
  fetchAllPosts(@Query() fetchPostsDto: FetchPostsDto) {
      return this.postService.fetchAllPosts(fetchPostsDto);
  }

  @UseGuards(AuthGuard)
  @Post(':postId/like')
  likePost(@Param('postId') postId: number, @Request() req: GuardRequest) {
      const userId = parseInt(req.user.sub);
      return this.postService.setLike(postId, userId);
  }

  @UseGuards(AuthGuard)
  @Delete(':postId/like')
  unlikePost(
    @Param('postId') postId: number,
    @Request() req: GuardRequest,
  ) {
      const userId = parseInt(req.user.sub);
      return this.postService.removeLike(postId, userId);
  }
}
