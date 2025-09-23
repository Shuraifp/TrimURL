import { Injectable, NotFoundException } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { PrismaService } from 'prisma/prisma.service';
import { URLListResponseDto } from 'src/types/url';

@Injectable()
export class UrlService {
  constructor(private prisma: PrismaService) {}

  async shorten(original: string, userId: string) {
    const shortCode = nanoid(8);
    console.log(original, 'userid ', userId);

    const url = await this.prisma.url.create({
      data: {
        original,
        shortCode,
        userId: parseInt(userId),
      },
    });

    return {
      id: url.id,
      userId: url.userId,
      shortUrl: `${process.env.APP_URL}/${shortCode}`,
      original: url.original,
      createdAt: url.createdAt,
    };
  }

  async resolve(shortCode: string) {
    const url = await this.prisma.url.findUnique({
      where: { shortCode },
    });
    if (!url) throw new NotFoundException('URL not found');

    return url.original;
  }

  async findAllByUser(userId: string) {
    return this.prisma.url.findMany({
      where: { userId: parseInt(userId) },
      orderBy: { createdAt: 'desc' },
    });
  }

  async release(id: string, userId: string) {
    const url = await this.prisma.url.findUnique({
      where: { id },
    });

    if (!url || url.userId !== parseInt(userId)) {
      throw new NotFoundException('URL not found or unauthorized');
    }

    await this.prisma.url.delete({ where: { id } });

    return { success: true, message: 'URL released successfully' };
  }
}
