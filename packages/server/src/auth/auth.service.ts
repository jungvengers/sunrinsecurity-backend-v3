import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private refreshTokenStore: Map<string, string> = new Map();

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  public async generateRefreshToken(user: Express.User): Promise<string> {
    const token = await this.jwtService.signAsync(
      { email: user.email },
      {
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRES_IN'),
      },
    );

    this.refreshTokenStore.set(user.email, token);

    return token;
  }

  public async validateRefreshToken(
    email: string,
    refreshToken: string,
  ): Promise<boolean> {
    try {
      const token = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      });

      return (
        token.email === email &&
        refreshToken === this.refreshTokenStore.get(email)
      );
    } catch {
      return false;
    }
  }

  public async generateAccessToken(user: Express.User): Promise<string> {
    return await this.jwtService.signAsync(
      { email: user.email },
      {
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES_IN'),
      },
    );
  }

  public async validateAccessToken(
    email: string,
    accessToken: string,
  ): Promise<boolean> {
    try {
      const { _email } = await this.jwtService.verifyAsync(accessToken, {
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      });

      return email === _email;
    } catch {
      return false;
    }
  }
}
