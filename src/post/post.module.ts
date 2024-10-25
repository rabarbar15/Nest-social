import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './models/post.model';
import { Like } from './models/like.model';
import { User } from 'src/user/models/user.model';

@Module({
    imports: [AuthModule, SequelizeModule.forFeature([Post, Like, User])],
    providers: [PostService],
    controllers: [PostController],
    exports: [PostService, SequelizeModule],
})
export class PostModule {}
