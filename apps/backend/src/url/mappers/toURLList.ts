import { URLListResponseDto, URLSchema } from '../../../src/types/url'

export function toURLList(urls: URLSchema[]): URLListResponseDto[] {
  return urls.map(url => ({
    id: url.id,
    original: url.original,
    shortUrl: `${process.env.APP_URL}/${url.shortCode}`,
    userId: url.userId,
    createdAt: url.createdAt.toISOString(),
  }))
}