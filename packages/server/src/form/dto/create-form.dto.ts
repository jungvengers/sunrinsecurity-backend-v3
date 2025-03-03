import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateFormDto {
  @ApiProperty({ example: 1, description: '동아리 ID' })
  @IsInt({ message: '동아리 ID는 정수로 입력해주세요.' })
  clubid!: number;

  @ApiProperty({ example: '질문1', description: '질문' })
  @IsOptional()
  @IsString({ message: '질문은 문자열로 입력해주세요.' })
  question1: string;

  @ApiProperty({ example: '질문2', description: '질문' })
  @IsOptional()
  @IsString({ message: '질문은 문자열로 입력해주세요.' })
  question2: string;

  @ApiProperty({ example: '질문3', description: '질문' })
  @IsOptional()
  @IsString({ message: '질문은 문자열로 입력해주세요.' })
  question3: string;

  @ApiProperty({ example: '질문4', description: '질문' })
  @IsOptional()
  @IsString({ message: '질문은 문자열로 입력해주세요.' })
  question4: string;

  @ApiProperty({ example: '질문5', description: '질문' })
  @IsOptional()
  @IsString({ message: '질문은 문자열로 입력해주세요.' })
  question5: string;

  @ApiProperty({ example: '질문6', description: '질문' })
  @IsOptional()
  @IsString({ message: '질문은 문자열로 입력해주세요.' })
  question6: string;

  @ApiProperty({ example: '질문7', description: '질문' })
  @IsOptional()
  @IsString({ message: '질문은 문자열로 입력해주세요.' })
  question7: string;

  @ApiProperty({ example: '질문8', description: '질문' })
  @IsOptional()
  @IsString({ message: '질문은 문자열로 입력해주세요.' })
  question8: string;

  @ApiProperty({ example: '질문9', description: '질문' })
  @IsOptional()
  @IsString({ message: '질문은 문자열로 입력해주세요.' })
  question9: string;

  @ApiProperty({ example: '질문10', description: '질문' })
  @IsOptional()
  @IsString({ message: '질문은 문자열로 입력해주세요.' })
  question10: string;

  constructor(
    clubid: number,
    question1: string,
    question2: string,
    question3: string,
    question4: string,
    question5: string,
    question6: string,
    question7: string,
    question8: string,
    question9: string,
    question10: string,
  ) {
    this.clubid = clubid;
    this.question1 = question1;
    this.question2 = question2;
    this.question3 = question3;
    this.question4 = question4;
    this.question5 = question5;
    this.question6 = question6;
    this.question7 = question7;
    this.question8 = question8;
    this.question9 = question9;
    this.question10 = question10;
  }
}
