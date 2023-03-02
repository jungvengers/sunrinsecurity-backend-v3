import {
  CanActivate,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  mixin,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DateTime } from 'luxon';

function checkTimeLimit(startTime: DateTime, endTime: DateTime) {
  const now = DateTime.local();

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
      const startTime = DateTime.fromISO(
        this.config.get<string>(startTimeKey, '2021-01-01T00:00:00'),
      );
      const endTime = DateTime.fromISO(
        this.config.get<string>(endTimeKey, '2021-01-01T23:59:59'),
      );

      return checkTimeLimit(startTime, endTime);
    }
  }
  return mixin(TimeLimitGuardMixin);
};
