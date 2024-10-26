import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'User signed up successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 409, description: 'User already exists' })
  @ApiBody({ type: SignUpDto })
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
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBody({ type: SignInDto })
  @Post('signin')
  signIn(@Body() signInDto: SignInDto) {
      return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
