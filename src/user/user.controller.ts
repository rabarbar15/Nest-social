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

@Controller('user')
export class UserController {
    constructor(
    private readonly userService: UserService,
    private readonly backupService: BackupService,
    ) {}

  @UseGuards(AuthGuard)
  @Get('profile')
    getProfile(@Request() req: GuardRequest) {
        return this.userService.getProfile(req.user.sub);
    }

  @UseGuards(AuthGuard)
  @Put('profile')
  updateProfile(
    @Request() req: GuardRequest,
    @Body() profile: UpdateProfileDto,
  ) {
      return this.userService.updateProfile(req.user.sub, profile);
  }

  @Post('backup')
  backupUsersData() {
      const success = this.backupService.backupUserData();
      return  success ? 'Backup completed' : 'Backup failed';
  }

  @UseGuards(AuthGuard)
  @Get('users-with-first-post-and-likes')
  async getUsersWithFirstPostAndLikes(): Promise<UserPostLikesDto[]> {
      return this.userService.getUsersWithFirstPostAndLikes();
  }
}
