import { CreateUserData } from '../dto/response.dto';
import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: number): Promise<UserEntity | null>;
  create(userData: CreateUserData): Promise<UserEntity>;
  // update(id: number, userData: Partial<UserEntity>): Promise<UserEntity>;
}
