import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsInt } from 'class-validator';

export class FindNoticeDto {
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsInt({
    message: '페이지는 숫자로 입력해주세요.',
  })
  @Type(() => Number)
  page = 1;
}
