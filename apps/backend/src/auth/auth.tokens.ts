export const AUTH_TOKENS = {
  AUTH_SERVICE: Symbol('IAuthService'),
  USER_REPOSITORY: Symbol('IUserRepository'),
  PASSWORD_SERVICE: Symbol('IPasswordService'),
  TOKEN_SERVICE: Symbol('ITokenService'),
} as const;