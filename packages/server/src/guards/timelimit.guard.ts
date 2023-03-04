import {
  CanActivate,
  HttpException,
  HttpStatus,
  Inject,
  mixin,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DateTime } from 'luxon';

export function checkTimeLimit(startTime: DateTime, endTime: DateTime) {
  const now = DateTime.local({ zone: 'Asia/Seoul' });

  if (now < startTime) {
    throw new HttpException(
      `The time limit for this operation has not started yet. Start time: ${startTime.toISO()}`,
      HttpStatus.FORBIDDEN,
    );
  }

  if (now > endTime) {
    throw new HttpException(
      `The time limit for this operation has expired. End time: ${endTime.toISO()}`,
      HttpStatus.FORBIDDEN,
    );
  }

  return now >= startTime && now <= endTime;
}

export const TimeLimitGuard = (startTime: DateTime, endTime: DateTime) => {
  class TimeLimitGuardMixin implements CanActivate {
    canActivate() {
      return checkTimeLimit(startTime, endTime);
    }
  }
  return mixin(TimeLimitGuardMixin);
};

export const TimeLimitFromConfigGuard = (
  startTimeKey: string,
  endTimeKey: string,
) => {
  class TimeLimitGuardMixin implements CanActivate {
    @Inject(ConfigService)
    private readonly config!: ConfigService;

    canActivate() {
      const startTime = DateTime.fromJSDate(
        this.config.get<Date>(startTimeKey, new Date(0)),
        {
          zone: 'Asia/Seoul',
        },
      );
      const endTime = DateTime.fromJSDate(
        this.config.get<Date>(endTimeKey, new Date(0)),
        {
          zone: 'Asia/Seoul',
        },
      );

      return checkTimeLimit(startTime, endTime);
    }
  }
  return mixin(TimeLimitGuardMixin);
};
