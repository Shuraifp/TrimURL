import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
  HttpCode,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import type { IAuthService } from './interfaces/auth-service.interface';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuthService')
    private readonly authService: IAuthService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  @HttpCode(HttpStatus.OK)
  getProfile(@Request() req) {
    // req.user is set by JwtStrategy.validate()
    return req.user;
  }
}
