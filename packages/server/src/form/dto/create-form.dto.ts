import { ApiProperty } from '@nestjs/swagger';

export class CreateFormDto {
  @ApiProperty({ example: 1, description: '동아리 ID' })
  clubid!: number;

  @ApiProperty({ example: ['질문1', '질문2'], description: '질문' })
  questions: string[];

  constructor(questions: string[]) {
    this.questions = questions;
  }
}
