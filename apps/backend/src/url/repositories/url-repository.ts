import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { IUrlRepository } from '../interfaces/url-repository.interface';
import { UrlEntity } from '../entities/url.entity';
import { CreateUrlData } from '../dto/responses.dto';

@Injectable()
export class UrlRepository implements IUrlRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUrlData): Promise<UrlEntity> {
    const url = await this.prisma.url.create({
      data: {
        original: data.original,
        shortCode: data.shortCode,
        userId: data.userId,
      },
    });

    return this.toDomain(url);
  }

  async findByShortCode(shortCode: string): Promise<UrlEntity | null> {
    const url = await this.prisma.url.findUnique({
      where: { shortCode },
    });

    return url ? this.toDomain(url) : null;
  }

  async findById(id: string): Promise<UrlEntity | null> {
    const url = await this.prisma.url.findUnique({
      where: { id },
    });

    return url ? this.toDomain(url) : null;
  }

  async findAllByUserId(userId: number): Promise<UrlEntity[]> {
    const urls = await this.prisma.url.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return urls.map((url) => this.toDomain(url));
  }

  async delete(id: string): Promise<void> {
    await this.prisma.url.delete({
      where: { id },
    });
  }

  async incrementClicks(id: string): Promise<void> {
    await this.prisma.url.update({
      where: { id },
      data: { clicks: { increment: 1 } },
    });
  }

  private toDomain(prismaUrl: any): UrlEntity {
    return new UrlEntity(
      prismaUrl.id,
      prismaUrl.original,
      prismaUrl.shortCode,
      prismaUrl.userId,
      prismaUrl.clicks || 0,
      prismaUrl.createdAt,
      prismaUrl.updatedAt,
    );
  }
}
