export interface IUrlBuilder {
  buildShortUrl(shortCode: string): string;
  getBaseUrl(): string;
}