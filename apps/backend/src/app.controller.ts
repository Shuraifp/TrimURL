import { Controller, Get, Inject, Param, Res } from '@nestjs/common';
import type { Response } from 'express';
import type { IUrlService } from './url/interfaces/url-service.interface';
import { URL_SERVICE_TOKEN } from './url/url.tokens';

@Controller()
export class AppController {
  constructor(
    @Inject(URL_SERVICE_TOKEN)
    private readonly urlService: IUrlService,
  ) {}

  @Get(':shortCode')
  async redirect(@Param('shortCode') shortCode: string, @Res() res: Response) {
    const original = await this.urlService.resolve(shortCode);
    return res.redirect(original);
  }
}
