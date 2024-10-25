import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import * as nodemailer from 'nodemailer';
import { Logger } from 'winston';

@Injectable()
export class EmailService {
    private transporter;
    private senderUser: string;
    private senderPass: string;

    constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {
        this.senderUser = '4922c8c9-5c9d-4ac6-90d3-6d5165757956@mailslurp.net';
        this.senderPass = 'WV8oiDmRNb7vyBNojcl5J8Dar2B1H4I1';

        this.transporter = nodemailer.createTransport({
            host: 'mxslurp.click',
            port: 2525,
            secure: false,
            auth: {
                user: this.senderUser,
                pass: this.senderPass,
            },
        });
    }

    async sendProfileUpdatedEmail(
        firstName: string,
        email: string,
    ): Promise<void> {
        const mailOptions = {
            from: this.senderUser,
            to: email,
            subject: 'Profile Updated',
            text: `Hi ${firstName}, your profile has been updated successfully!`,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            this.logger.info(`Email sent: ${info.messageId}`);
        } catch (error) {
            this.logger.error('Error sending email:', error);
            throw new Error('Failed to send email');
        }
    }
}
