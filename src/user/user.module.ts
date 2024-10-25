import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { BackupService } from 'src/backup/backup.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';

@Module({
    imports: [forwardRef(() => AuthModule), SequelizeModule.forFeature([User])],
    providers: [UserService, BackupService],
    controllers: [UserController],
    exports: [UserService, SequelizeModule],
})
export class UserModule {}
