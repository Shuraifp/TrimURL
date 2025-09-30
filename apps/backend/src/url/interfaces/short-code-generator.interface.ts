export interface IShortCodeGenerator {
  generate(length?: number): string;
  validate(shortCode: string): boolean;
}