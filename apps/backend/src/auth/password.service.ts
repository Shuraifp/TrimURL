import { Injectable } from "@nestjs/common";
import { IPasswordService } from "./interfaces/password-service.interface";
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService implements IPasswordService {
  private readonly saltRounds = 10;

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compare(plainText: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plainText, hashed);
  }
}