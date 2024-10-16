import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import ms from 'ms';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  public async generateRefreshToken(user: Express.User): Promise<string> {
    const token = await this.jwtService.signAsync(user, {
      secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRES_IN'),
    });

    this.cacheManager.set(
      `refresh-${user.email}`,
      token,
      ms(this.configService.get<string>('REFRESH_TOKEN_EXPIRES_IN', '1w')),
    );

    return token;
  }

  public async removeRefreshToken(refreshToken: string): Promise<void> {
    const token = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.get('REFRESH_TOKEN_SECRET'),
    });

    this.cacheManager.del(`refresh-${token.email}`);
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
        refreshToken === (await this.cacheManager.get(`refresh-${email}`))
      );
    } catch {
      return false;
    }
  }

  public async generateAccessToken(user: Express.User): Promise<string> {
    return await this.jwtService.signAsync(user, {
      secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES_IN'),
    });
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
