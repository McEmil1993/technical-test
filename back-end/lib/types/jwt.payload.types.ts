export type JwtPayload = {
  id: number;
  role: 'admin' | 'user';
  iat: number;
  exp: number;
}

export type IJwtPayloadReturn = {
  message: string;
  data: JwtPayload | null;
}