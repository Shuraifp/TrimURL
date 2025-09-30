import { ShortenResponseDto, URLListResponseDto } from "../dto/responses.dto";

export class UrlEntity {
  constructor(
    public readonly id: string,
    public readonly original: string,
    public readonly shortCode: string,
    public readonly userId: number,
    public readonly clicks: number = 0,
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt?: Date,
  ) {}

  public isOwnedBy(userId: number): boolean {
    return this.userId === userId;
  }

  public toResponse(baseUrl: string): ShortenResponseDto {
    return {
      id: this.id,
      userId: this.userId,
      shortUrl: `${baseUrl}/${this.shortCode}`,
      original: this.original,
      clicks: this.clicks,
      createdAt: this.createdAt,
    };
  }

  public toListItem(baseUrl: string): URLListResponseDto {
    return {
      id: this.id,
      original: this.original,
      shortUrl: `${baseUrl}/${this.shortCode}`,
      userId: this.userId,
      clicks: this.clicks,
      createdAt: this.createdAt.toISOString(),
    };
  }
}
