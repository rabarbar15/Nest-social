export class ProfileUpdatedEvent {
    constructor(
    public readonly firstName: string,
    public readonly email: string,
    ) {}
}
