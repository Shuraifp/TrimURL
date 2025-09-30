import { ReleaseResponseDto, ShortenResponseDto, URLListResponseDto } from "../dto/responses.dto";

export interface IUrlService {
  shorten(original: string, userId: string): Promise<ShortenResponseDto>;
  resolve(shortCode: string): Promise<string>;
  findAllByUser(userId: string): Promise<URLListResponseDto[]>;
  release(id: string, userId: string): Promise<ReleaseResponseDto>;
}