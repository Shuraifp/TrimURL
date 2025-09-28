import { LoginDto } from "../dto/login.dto";
import { RegisterDto } from "../dto/register.dto";
import { LoginResponseDto, RegisterResponseDto } from "../dto/response.dto";
import { UserEntity } from "../entities/user.entity";

export interface IAuthService {
  register(dto: RegisterDto): Promise<RegisterResponseDto>;
  login(dto: LoginDto): Promise<LoginResponseDto>;
  validateUser(email: string, password: string): Promise<UserEntity | null>;
}