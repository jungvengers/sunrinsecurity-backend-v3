import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsNumber } from 'class-validator';

export class CreateFormDto {
  @ApiProperty({ example: 1, description: '동아리 ID' })
  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
      maxDecimalPlaces: 0,
    },
    {
      message: '동아리 ID는 숫자로 입력해주세요.',
    },
  )
  clubid!: number;

  @ApiProperty({ example: ['질문1', '질문2'], description: '질문' })
  @IsArray({
    message: '질문은 1개 이상 10개 이하로 입력해주세요.',
  })
  @ArrayMaxSize(10, {
    message: '질문은 1개 이상 10개 이하로 입력해주세요.',
  })
  @ArrayMinSize(1, {
    message: '질문은 1개 이상 10개 이하로 입력해주세요.',
  })
  questions: string[];

  constructor(clubid: number, questions: string[]) {
    this.clubid = clubid;
    this.questions = questions;
  }
}
