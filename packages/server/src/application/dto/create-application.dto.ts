import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto {
  @ApiProperty({ example: 1, description: '동아리 ID' })
  clubid!: number;
  @ApiProperty({ example: '010-1234-5678', description: '전화번호' })
  phone!: string;
  // @ApiProperty({
  //   example:
  //     'https://cdn.sunrin-security.com/43f52ba22a8ff688cfa792c97c79f37b.png',
  //   description: '포트폴리오',
  // })
  // portfolio!: string;
  @ApiProperty({
    example: '동아리 활동에 대해 알고 싶습니다.',
    description: '응답 1',
  })
  answer1!: string;
  @ApiProperty({
    example: '동아리 활동에 대해 알고 싶습니다.',
    description: '응답 2',
  })
  answer2!: string;
  @ApiProperty({
    example: '동아리 활동에 대해 알고 싶습니다.',
    description: '응답 3',
  })
  answer3!: string;
  @ApiProperty({
    example: '동아리 활동에 대해 알고 싶습니다.',
    description: '응답 4',
  })
  answer4!: string;
  @ApiProperty({
    example: '동아리 활동에 대해 알고 싶습니다.',
    description: '응답 5',
  })
  answer5!: string;
  @ApiProperty({
    example: '동아리 활동에 대해 알고 싶습니다.',
    description: '응답 6',
  })
  answer6!: string;
  @ApiProperty({
    example: '동아리 활동에 대해 알고 싶습니다.',
    description: '응답 7',
  })
  answer7!: string;
  @ApiProperty({
    example: '동아리 활동에 대해 알고 싶습니다.',
    description: '응답 8',
  })
  answer8!: string;
  @ApiProperty({
    example: '동아리 활동에 대해 알고 싶습니다.',
    description: '응답 9',
  })
  answer9!: string;
  @ApiProperty({
    example: '동아리 활동에 대해 알고 싶습니다.',
    description: '응답 10',
  })
  answer10!: string;

  constructor(
    clubid: number,
    answer1: string,
    answer2: string,
    answer3: string,
    answer4: string,
    answer5: string,
    answer6: string,
    answer7: string,
    answer8: string,
    answer9: string,
    answer10: string,
  ) {
    this.clubid = clubid;
    this.answer1 = answer1;
    this.answer2 = answer2;
    this.answer3 = answer3;
    this.answer4 = answer4;
    this.answer5 = answer5;
    this.answer6 = answer6;
    this.answer7 = answer7;
    this.answer8 = answer8;
    this.answer9 = answer9;
    this.answer10 = answer10;
  }
}
