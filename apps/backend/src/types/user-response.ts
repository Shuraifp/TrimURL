export interface UserResponseDto {
  id: number;
  email: string;
  name: string | null;
  avatar: string | null;
}

export interface LoginResponseDto {
  access_token: string;
  user: UserResponseDto;
}