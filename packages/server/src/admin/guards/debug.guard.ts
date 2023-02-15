import { CanActivate, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DebugGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate() {
    return this.config.get<string>('NODE_ENV') === 'development';
  }
}
