import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  ExtractJwt,
  Strategy,
  StrategyOptions,
  JwtFromRequestFunction,
} from 'passport-jwt';
import { JwtPayload } from './dto/jwt.dto';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const opts: StrategyOptions = {
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken() as JwtFromRequestFunction,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET!,
    };
    super(opts);
  }

  validate(payload: JwtPayload): { userId: string; email: string } {
    return { userId: payload.sub, email: payload.email };
  }
}
