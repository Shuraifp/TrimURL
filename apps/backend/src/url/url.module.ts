import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { PrismaService } from 'prisma/prisma.service';
import { UrlRepository } from './repositories/url-repository';
import { ShortCodeGeneratorService } from './services/short-code-generator.service';
import { UrlBuilderService } from './services/url-builder.service';
import {
  SHORT_CODE_GENERATOR_TOKEN,
  URL_BUILDER_TOKEN,
  URL_REPOSITORY_TOKEN,
  URL_SERVICE_TOKEN,
} from './url.tokens';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    UrlService,
    PrismaService,
    {
      provide: URL_SERVICE_TOKEN,
      useClass: UrlService,
    },
    {
      provide: URL_REPOSITORY_TOKEN,
      useClass: UrlRepository,
    },
    {
      provide: SHORT_CODE_GENERATOR_TOKEN,
      useClass: ShortCodeGeneratorService,
    },
    {
      provide: URL_BUILDER_TOKEN,
      useClass: UrlBuilderService,
    },
  ],
  controllers: [UrlController],
  exports: [URL_SERVICE_TOKEN],
})
export class UrlModule {}
