import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtStrategy } from './jwt.strategy';
import { PasswordService } from './password.service';
import { UserRepository } from './repositories/user.repository';
import { AUTH_TOKENS } from './auth.tokens';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION },
    }),
  ],
  providers: [
    AuthService,
    PrismaService,
    JwtStrategy,
    {
      provide: AUTH_TOKENS.AUTH_SERVICE,
      useClass: AuthService,
    },
    {
      provide: AUTH_TOKENS.USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: AUTH_TOKENS.PASSWORD_SERVICE,
      useClass: PasswordService,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
