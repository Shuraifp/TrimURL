export interface URLResponseDto {
  shortUrl: string;
  original: string;
}


export interface URLListResponseDto {
  id: string;
  original: string;
  shortUrl: string;
  userId: number;
  createdAt: string;
}