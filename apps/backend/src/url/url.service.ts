import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { IUrlRepository } from './interfaces/url-repository.interface';
import type { IShortCodeGenerator } from './interfaces/short-code-generator.interface';
import type { IUrlBuilder } from './interfaces/url-builder.interface';
import { SHORT_CODE_GENERATOR_TOKEN, URL_BUILDER_TOKEN, URL_REPOSITORY_TOKEN } from './url.tokens';

@Injectable()
export class UrlService {
  constructor(
    @Inject(URL_REPOSITORY_TOKEN)
    private urlRepository: IUrlRepository,
    @Inject(SHORT_CODE_GENERATOR_TOKEN)
    private shortCodeGenerator: IShortCodeGenerator,
    @Inject(URL_BUILDER_TOKEN)
    private urlBuilder: IUrlBuilder,
  ) {}

  async shorten(original: string, userId: string) {
    const shortCode = this.shortCodeGenerator.generate();

    const url = await this.urlRepository.create({
      original,
      userId: parseInt(userId),
      shortCode,
    });

    return url.toResponse(this.urlBuilder.getBaseUrl());
  }

  async resolve(shortCode: string) {
    const url = await this.urlRepository.findByShortCode(shortCode);
    if (!url) throw new NotFoundException('URL not found');

    this.urlRepository.incrementClicks(url.id).catch((err) => {
      console.error('Failed to increment clicks:', err);
    });

    return url.original;
  }

  async findAllByUser(userId: string) {
    const urls = await this.urlRepository.findAllByUserId(parseInt(userId));
    const baseUrl = this.urlBuilder.getBaseUrl();

    return urls.map((url) => url.toListItem(baseUrl));
  }

  async release(id: string, userId: string) {
    const url = await this.urlRepository.findById(id);

    if (!url) {
      throw new NotFoundException('URL not found');
    }

    if (!url.isOwnedBy(parseInt(userId))) {
      throw new ForbiddenException('You do not own this URL');
    }

    await this.urlRepository.delete(id);

    return { success: true, message: 'URL released successfully' };
  }
}
