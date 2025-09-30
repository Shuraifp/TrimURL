export interface ShortenResponseDto {
  id: string;
  userId: number;
  shortUrl: string;
  original: string;
  clicks: number;
  createdAt: Date;
}

export interface URLListResponseDto {
  id: string;
  original: string;
  shortUrl: string;
  userId: number;
  clicks: number;
  createdAt: string;
}

export interface ReleaseResponseDto {
  success: boolean;
  message: string;
}

export interface CreateUrlData {
  original: string;
  shortCode: string;
  userId: number;
}