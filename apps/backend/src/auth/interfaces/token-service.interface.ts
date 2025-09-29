import { JwtPayload } from "../dto/jwt.dto";

export interface ITokenService {
  generateToken(payload: JwtPayload): Promise<string>;
  verifyToken(token: string): Promise<JwtPayload>;
}