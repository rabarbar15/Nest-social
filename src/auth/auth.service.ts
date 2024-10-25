import { Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
// import { User } from 'src/user/models/user.model';

@Injectable()
export class AuthService {
    constructor(
    private userSevice: UserService,
    private jwtService: JwtService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}

    async signUp(
        firstName: string,
        lastName: string,
        email: string,
        password: string,
    ) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const users = await this.userSevice.findAll();

            if (users.find((user) => user.email === email)) {
                this.logger.error(`User with email ${email} already exists`);
                return { message: 'User already exists' };
            }

            await this.userSevice.createUser({
                firstName,
                lastName,
                email,
                password: hashedPassword,
            });

            this.logger.info(`User with email ${email} signed up`);
        } catch (error) {
            this.logger.error(error);
            return { message: 'Error signing up user' };
        }

        return { message: 'User signed up successfully' };
    }

    async signIn(email: string, password: string) {
        const user = await this.userSevice.findByEmail(email);
        if (!user) {
            this.logger.error(`User with email ${email} not found`);
            return { message: 'User not found' };
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            this.logger.error(`Password does not match for user with email ${email}`);
            return { message: 'Password does not match' };
        }

        const token = await this.jwtService.signAsync({
            sub: user.id,
        });
        this.logger.info(`User with email ${email} signed in`);

        return { token };
    }
}
