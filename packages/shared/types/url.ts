export interface URLResponseDto {
  shortUrl: string;
  original: string;
}

export interface URLSchema {
  original: string;
  id: string;
  shortCode: string;
  userId: number;
  createdAt: Date;
}

export interface URLListResponseDto {
  id: string;
  original: string;
  shortUrl: string;
  userId: number;
  createdAt: string;
}