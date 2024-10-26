import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProfileDto } from './dto/profile.dot';
import { UpdateProfileDto } from './dto/updateProfile.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ProfileUpdatedEvent } from './events/profile-updated.event';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { UserPostLikesDto } from './dto/usersPostsLikes.dto';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UserService {

    constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly eventEmitter: EventEmitter2,
    @InjectModel(User)
    private userModel: typeof User,
    private readonly sequelize: Sequelize,
    ) {
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const users = await this.findAll();
        return users.find((user: User) => user.email === email);
    }

    async findAll(): Promise<User[]> {
        return this.userModel.findAll();
    }

    async createUser(userData: Partial<User>): Promise<User> {
        const newUser = this.userModel.build(userData);
        await newUser.save();
        this.logger.info(`User with email ${newUser.email} signed up`);
        return newUser;
    }

    async getProfile(id: string): Promise<ProfileDto> {
        const user = await this.userModel.findByPk(id);

        if (!user) {
            throw new Error('User not found');
        }

        this.logger.info(`Fetching profile for user with id ${id}`);

        return {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        };
    }

    async updateProfile(id: string, profile: UpdateProfileDto): Promise<Partial<User>> {
        const user = await this.userModel.findByPk(id);

        if (!user) {
            this.logger.error(`User with id ${id} not found`);
            throw new NotFoundException('User not found');
        }

        user.firstName = profile.firstName;
        user.lastName = profile.lastName;

        await user.save();

        this.logger.info(`Profile updated for user with id ${id}`);
        this.eventEmitter.emit(
            'user.profileUpdated',
            new ProfileUpdatedEvent(user.firstName, user.email),
        );

        return { firstName: user.firstName, lastName: user.lastName };
    }

    async getUsersWithFirstPostAndLikes(): Promise<UserPostLikesDto[]> {
        const query = `
            SELECT 
                u.id AS userId,
                u.firstName,
                u.lastName,
                u.email,
                p.id AS postId,
                p.title AS postTitle,
                p.description AS postDescription,
                p.createdDate AS postCreatedDate,
                COUNT(l.id) AS likesCount
            FROM Users u
            LEFT JOIN Posts p ON p.authorId = u.id
            LEFT JOIN Likes l ON l.postId = p.id
            WHERE p.id = (
                SELECT MIN(p2.id)
                FROM Posts p2
                WHERE p2.authorId = u.id
            )
            GROUP BY u.id, p.id
        `;

        const [results] = await this.sequelize.query(query);
        return results as UserPostLikesDto[];
    }
}
