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

export interface RegisterResponseDto {
  message: string;
  user: UserResponseDto;
}

export interface CreateUserData {
  email: string;
  password: string;
  name: string;
}