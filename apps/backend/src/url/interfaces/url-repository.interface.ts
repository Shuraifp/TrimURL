import { CreateUrlData } from "../dto/responses.dto";
import { UrlEntity } from "../entities/url.entity";

export interface IUrlRepository {
  create(data: CreateUrlData): Promise<UrlEntity>;
  findByShortCode(shortCode: string): Promise<UrlEntity | null>;
  findById(id: string): Promise<UrlEntity | null>;
  findAllByUserId(userId: number): Promise<UrlEntity[]>;
  delete(id: string): Promise<void>;
  incrementClicks(id: string): Promise<void>;
}