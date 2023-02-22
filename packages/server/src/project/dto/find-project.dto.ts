import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class FindProjectDto {
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
      maxDecimalPlaces: 0,
    },
    {
      message: '페이지는 숫자로 입력해주세요.',
    },
  )
  page = 1;

  constructor(page: number) {
    this.page = page;
  }
}
