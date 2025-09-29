import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { PrismaService } from '../../../prisma/prisma.service';
import { UserEntity } from '../entities/user.entity';
import { CreateUserData } from '../dto/response.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? this.toDomain(user) : null;
  }

  async findById(id: number): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return user ? this.toDomain(user) : null;
  }

  async create(userData: CreateUserData): Promise<UserEntity> {
    const user = await this.prisma.user.create({
      data: userData,
    });

    return this.toDomain(user);
  }

  // async update(id: number, userData: Partial<UserEntity>): Promise<UserEntity> {
  //   const user = await this.prisma.user.update({
  //     where: { id },
  //     data: userData,
  //   });

  //   return this.toDomain(user);
  // }

  private toDomain(prismaUser: any): UserEntity {
    return new UserEntity(
      prismaUser.id,
      prismaUser.email,
      prismaUser.password,
      prismaUser.name,
      prismaUser.avatar,
      prismaUser.createdAt,
      prismaUser.updatedAt,
    );
  }
}
