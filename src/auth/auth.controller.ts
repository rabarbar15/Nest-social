import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signup')
    signUp(@Body() signUpDto: SignUpDto) {
        return this.authService.signUp(
            signUpDto.firstName,
            signUpDto.lastName,
            signUpDto.email,
            signUpDto.password,
        );
    }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() signInDto: SignInDto) {
      return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
