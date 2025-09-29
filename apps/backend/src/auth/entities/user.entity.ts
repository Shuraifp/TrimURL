import { UserResponseDto } from "../dto/response.dto";

export class UserEntity {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly password: string,
    public readonly name: string,
    public readonly avatar?: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}

  private toNumber(value: any): number {
    return typeof value === 'number' ? value : parseInt(value, 10);
  }

  public toResponse(): UserResponseDto {
    return {
      id: this.toNumber(this.id),
      email: this.email,
      name: this.name,
      avatar: this.avatar || null,
    };
  }
}