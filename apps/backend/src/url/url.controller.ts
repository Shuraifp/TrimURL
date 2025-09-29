import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { AuthGuard } from '@nestjs/passport';
import { toURLList } from './mappers/toURLList';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('shorten')
  async shorten(@Body('original') original: string, @Request() req) {
    return this.urlService.shorten(original, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my/list')
  async list(@Request() req) {
    return toURLList(await this.urlService.findAllByUser(req.user.userId));
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async release(@Param('id') id: string, @Request() req) {
    return this.urlService.release(id, req.user.userId);
  }
}
