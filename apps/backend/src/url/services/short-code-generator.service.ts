import { Injectable } from '@nestjs/common';
import { nanoid, customAlphabet } from 'nanoid';
import { IShortCodeGenerator } from '../interfaces/short-code-generator.interface';

@Injectable()
export class ShortCodeGeneratorService implements IShortCodeGenerator {
  private readonly defaultLength = 8;
  private readonly alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  generate(length: number = this.defaultLength): string {
    return nanoid(length);
  }

  generateCustom(length: number = this.defaultLength): string {
    const customNanoid = customAlphabet(this.alphabet, length);
    return customNanoid();
  }

  validate(shortCode: string): boolean {
    const regex = /^[a-zA-Z0-9]{6,12}$/;
    return regex.test(shortCode);
  }
}