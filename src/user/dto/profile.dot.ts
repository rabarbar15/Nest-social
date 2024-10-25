import { IsString } from 'class-validator';

export class ProfileDto {
  @IsString()
      firstName: string;

  @IsString()
      lastName: string;

  @IsString()
      email: string;
}
