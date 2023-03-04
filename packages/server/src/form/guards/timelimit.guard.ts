import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { DateTime } from 'luxon';
import { ExtractJwt } from 'passport-jwt';
import { AdminService } from 'src/admin/admin.service';
import { checkTimeLimit } from 'src/guards/timelimit.guard';

@Injectable()
export class TimeLimitGuard implements CanActivate {
  @Inject(ConfigService)
  private readonly config!: ConfigService;
  @Inject(JwtService)
  private readonly jwtService!: JwtService;
  @Inject(AdminService)
  private readonly adminService!: AdminService;

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const extractor = ExtractJwt.fromAuthHeaderAsBearerToken();
    const jwt = extractor(request);
    if (!jwt) throw new HttpException('Unauthorized', 401);
    const data = this.jwtService.decode(jwt) as Express.User;
    const email = data.email;
    const admin = await this.adminService.getAdmin(email);
    const startTime = DateTime.fromJSDate(
      this.config.get<Date>('FORM_START_TIME', new Date('2021-01-01T00:00:00')),
      {
        zone: 'Asia/Seoul',
      },
    );
    const endTime = DateTime.fromJSDate(
      this.config.get<Date>('FORM_END_TIME', new Date('2021-01-01T00:00:00')),
      {
        zone: 'Asia/Seoul',
      },
    );
    try {
      return checkTimeLimit(startTime, endTime);
    } catch (err) {
      if (admin) {
        return true;
      }
      throw err;
    }
  }
}
