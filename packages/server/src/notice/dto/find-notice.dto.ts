import { ApiProperty } from '@nestjs/swagger';

export class FindNoticeDto {
  @ApiProperty({
    required: false,
    type: Number,
  })
  page = 1;

  constructor(page: number) {
    this.page = page;
  }
}
