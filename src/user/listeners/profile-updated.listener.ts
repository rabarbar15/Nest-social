import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProfileUpdatedEvent } from '../events/profile-updated.event';
import { EmailService } from '../../email/email.service';
import { Injectable } from '@nestjs/common';

@Injectable()
@EventsHandler(ProfileUpdatedEvent)
export class ProfileUpdatedListener
implements IEventHandler<ProfileUpdatedEvent>
{
    constructor(private readonly emailService: EmailService) {}

    async handle(event: ProfileUpdatedEvent) {
        await this.emailService.sendProfileUpdatedEmail(
            event.firstName,
            event.email,
        );
    }
}
