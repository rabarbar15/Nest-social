
import { Inject, Injectable } from '@nestjs/common';
import { dirname, join } from 'path';
import * as fs from 'fs';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/user/models/user.model';

@Injectable()
export class BackupService {
    private readonly backupFilePath = join(
        __dirname,
        'backup-files',
        'users_backup.json',
    );

    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        @InjectModel(User) private readonly userModel: typeof User,
    ) {}

    async backupUserData(): Promise<boolean> {
        try {
            const users = await this.userModel.findAll();

            if (users.length === 0) {
                this.logger.warn('No user data found in the database.');
                return;
            }

            const usersData = users.map(user => user.toJSON());

            const backupDir = dirname(this.backupFilePath);
            if (!fs.existsSync(backupDir)) {
                fs.mkdirSync(backupDir, { recursive: true });
            }

            fs.writeFileSync(this.backupFilePath, JSON.stringify(usersData, null, 2));
            this.logger.info('User data backup completed successfully');
            return true;
        } catch (error) {
            this.logger.error('Error backing up user data:', error);
            return false;
        }
    }
}
