import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { IUrlService } from './interfaces/url-service.interface';
import { ShortenDto } from './dto/shorten.dto';
import { URL_SERVICE_TOKEN } from './url.tokens';

@Controller('url')
export class UrlController {
  constructor(
    @Inject(URL_SERVICE_TOKEN)
    private readonly urlService: IUrlService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('shorten')
  async shorten(@Body() dto: ShortenDto, @Request() req) {
    return this.urlService.shorten(dto.original, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my/list')
  async list(@Request() req) {
    return this.urlService.findAllByUser(req.user.userId)
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async release(@Param('id') id: string, @Request() req) {
    return this.urlService.release(id, req.user.userId);
  }
}
