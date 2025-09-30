import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUrlBuilder } from '../interfaces/url-builder.interface';

@Injectable()
export class UrlBuilderService implements IUrlBuilder {
  private readonly baseUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.baseUrl = this.configService.get<string>('APP_URL')!;
    console.log(this.baseUrl)
  }

  buildShortUrl(shortCode: string): string {
    return `${this.baseUrl}/${shortCode}`;
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }
}