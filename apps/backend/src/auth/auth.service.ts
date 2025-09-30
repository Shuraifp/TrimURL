import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto, RegisterResponseDto } from './dto/response.dto';
import type { IUserRepository } from './interfaces/user-repository.interface';
import type { IPasswordService } from './interfaces/password-service.interface';
import { IAuthService } from './interfaces/auth-service.interface';
import { UserEntity } from './entities/user.entity';
import { AUTH_TOKENS } from './auth.tokens';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(AUTH_TOKENS.USER_REPOSITORY)
    private userRepository: IUserRepository,
    @Inject(AUTH_TOKENS.PASSWORD_SERVICE)
    private passwordService: IPasswordService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<RegisterResponseDto> {
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) throw new BadRequestException('Email already in use');

    const hashed = await this.passwordService.hash(dto.password);
    const user = await this.userRepository.create({
      email: dto.email,
      password: hashed,
      name: dto?.name || '',
    });

    return {
      message: 'Registration successful',
      user: user.toResponse(),
    };
  }

  async login(dto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.validateUser(dto.email, dto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      user: user.toResponse(),
    };
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await this.passwordService.compare(
      password,
      user.password,
    );
    return isPasswordValid ? user : null;
  }
}
