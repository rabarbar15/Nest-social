import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './models/post.model';
import { Like } from './models/like.model';
import { FetchPostsDto } from './dto/fetchPosts.dto';
import { Op } from 'sequelize';

@Injectable()
export class PostService {

    constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @InjectModel(Post)
    private postModel: typeof Post,
    @InjectModel(Like)
    private likeModel: typeof Like,
    ) {}

    private async findAll(): Promise<Post[]> {
        return this.postModel.findAll();
    }

    async createPost(postData: Partial<Post>): Promise<Post> {
        const newPost = this.postModel.build(postData);
        await newPost.save();
        this.logger.info(`Post created by user with id ${newPost.authorId}`);
        return newPost;
    }

    async fetchUsersPosts(authorId: string, query: FetchPostsDto): Promise<Post[]> {
        const {page = 1, limit = 10, sortBy = 'createdAt', order = 'ASC', filter} = query;
        const offset = (page - 1) * limit;

        /* eslint-disable @typescript-eslint/no-explicit-any */
        const whereClause: any = { authorId };
        if (filter) {
            whereClause.title = { [Op.like]: `%${filter}%` };
        }

        this.logger.info(`Fetching posts for user with id ${authorId}`);
        return this.postModel.findAll({
            limit: Number(limit),
            offset: Number(offset),
            order: [[sortBy, order]],
            where: whereClause
        });
    }

    async fetchAllPosts(query: FetchPostsDto): Promise<Post[]> {
        const {page = 1, limit = 10, sortBy = 'createdAt', order = 'ASC', filter} = query;
        const offset = (page - 1) * limit;
        
        this.logger.info('Fetching all posts');
        return this.postModel.findAll({
            limit: Number(limit),
            offset: Number(offset),
            order: [[sortBy, order]],
            where: filter ? { title: { [Op.like]: `%${filter}%` } } : undefined
        });
    }

    async deletePost(postId: number, authorId: string): Promise<void> {
        const post = await this.postModel.findOne({
            where: {
                id: postId,
                authorId: authorId,
            },
        });

        if (!post) {
            this.logger.error(`Post with id ${postId} not found or you do not have permission to delete this post`);
            throw new NotFoundException('Post not found or you do not have permission to delete this post');
        }

        await this.postModel.destroy({
            where: {
                id: postId,
                authorId: authorId,
            },
        });

        this.logger.info(
            `Post with id ${postId} deleted by user with id ${authorId}`,
        );
    }

    async updatePost(
        postId: string,
        authorId: string,
        title: string,
        description: string,
    ): Promise<Post> {
        const post = await this.postModel.findOne({
            where: {
                id: postId,
                authorId: authorId,
            },
        });

        if (!post) {
            this.logger.error(`Post with id ${postId} not found or you do not have permission to update this post`);
            throw new NotFoundException('Post not found or you do not have permission to update this post');
        }

        post.title = title;
        post.description = description;

        await post.save();

        this.logger.info(
            `Post with id ${postId} updated by user with id ${authorId}`,
        );

        return post;
    }

    async setLike(postId: number, authorId: number): Promise<Like> {
        const post = await this.postModel.findByPk(postId);
        if (!post) {
            this.logger.error(`Post with id ${postId} not found`);
            throw new NotFoundException('Post not found');
        }

        const existingLike = await this.likeModel.findOne({
            where: {
                postId,
                authorId,
            },
        });

        if (!existingLike) {
            
            const like = await Like.create({
                postId,
                authorId,
            });

            this.logger.info(`User with id ${authorId} liked post with id ${postId}`);
            return like;
        }

        throw new ConflictException('You have already liked this post');
    }

    async removeLike(postId: number, authorId: number): Promise<Like> {
        const like = await this.likeModel.findOne({
            where: {
                postId,
                authorId,
            },
        });
        if (!like) {
            this.logger.error(`Like not found for post with id ${postId} and user with id ${authorId}`);
            throw new NotFoundException('Like not found');
        }

        await like.destroy();

        this.logger.info(`User with id ${authorId} unliked post with id ${postId}`);
        return like;
    }

}
