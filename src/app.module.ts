import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PostController } from './post/post.controller';
import { PostService } from './post/post.service';
import { PostModule } from './post/post.module';
import { BackupService } from './backup/backup.service';
import { EmailService } from './email/email.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EmailModule } from './email/email.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './post/models/post.model';
import { User } from './user/models/user.model';
import { Like } from './post/models/like.model';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: 'localhost',
            port: 3306,
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            autoLoadModels: true,
            synchronize: true,
            models: [Post, User, Like],
        }),
        EventEmitterModule.forRoot(),
        WinstonModule.forRoot({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp({
                    format: 'YYYY-MM-DD hh:mm:ss A',
                }),
                winston.format.printf(
                    (info) =>
                        `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`,
                ),
            ),
            transports: [
                new winston.transports.File({ filename: 'app.log' }),
                new winston.transports.Console(),
            ],
        }),
        UserModule,
        AuthModule,
        PostModule,
        EmailModule,
    ],
    controllers: [AppController, HealthController, PostController],
    providers: [AppService, PostService, BackupService, EmailService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('');
    }

}
