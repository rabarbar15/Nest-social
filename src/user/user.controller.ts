import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    Request,
    UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateProfileDto } from './dto/updateProfile.dto';
import { AuthGuard } from '../auth/auth.guard';
import { GuardRequest } from 'express';
import { BackupService } from 'src/backup/backup.service';
import { UserPostLikesDto } from './dto/usersPostsLikes.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProfileDto } from './dto/profile.dot';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(
    private readonly userService: UserService,
    private readonly backupService: BackupService,
    ) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'User profile retrieved successfully.', type: ProfileDto})
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get('profile')
    getProfile(@Request() req: GuardRequest) {
        return this.userService.getProfile(req.user.sub);
    }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({ status: 200, description: 'User profile updated successfully.', type: UpdateProfileDto })
  @Put('profile')
  updateProfile(
    @Request() req: GuardRequest,
    @Body() profile: UpdateProfileDto,
  ) {
      return this.userService.updateProfile(req.user.sub, profile);
  }

  @ApiOperation({ summary: 'Backup user data' })
  @ApiResponse({ status: 200, description: 'Backup completed.' })
  @ApiResponse({ status: 500, description: 'Backup failed.' })
  @Post('backup')
  backupUsersData() {
      const success = this.backupService.backupUserData();
      return  success ? 'Backup completed' : 'Backup failed';
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get users with first post and likes' })
  @ApiResponse({ status: 200, description: 'List of users with their first posts and likes.', type: UserPostLikesDto })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get('users-with-first-post-and-likes')
  async getUsersWithFirstPostAndLikes(): Promise<UserPostLikesDto[]> {
      return this.userService.getUsersWithFirstPostAndLikes();
  }
}
