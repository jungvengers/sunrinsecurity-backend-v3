import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsString,
  IsUrl,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    example: '선린라이프 해킹 시연',
    description: '프로젝트 이름',
  })
  @IsString({ message: '프로젝트 이름은 문자열로 입력해주세요.' })
  @MaxLength(255, {
    message: '프로젝트 이름은 255자 이하로 입력해주세요.',
  })
  name: string;

  @ApiProperty({
    example:
      'CVE-2024-3156을 이용해서 선린라이프를 해킹하는 시연 프로젝트입니다.',
    description: '프로젝트 설명',
  })
  @IsString({ message: '프로젝트 설명은 문자열로 입력해주세요.' })
  @MaxLength(255, {
    message: '프로젝트 설명은 255자 이하로 입력해주세요.',
  })
  description: string;

  @ApiProperty({
    example:
      '선린라이프 백엔드 개발자인 김형진과의 불화로 인하여 김형진에게 한방 먹여주기 위하여 선린라이프를 해킹하는 시연 프로젝트입니다.',
    description: '프로젝트 상세 설명',
  })
  @IsString({ message: '프로젝트 상세 설명은 문자열로 입력해주세요.' })
  detail: string;

  @ApiProperty({
    example:
      'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_92x30dp.png',
    description: '프로젝트 이미지',
  })
  @IsUrl(
    {
      protocols: ['http', 'https'],
      require_protocol: true,
    },
    { message: '프로젝트 이미지는 URL 형식으로 입력해주세요.' },
  )
  image: string;

  @ApiProperty({
    example: [
      'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_92x30dp.png',
    ],
    description: '프로젝트 첨부파일',
  })
  @IsArray({ message: '프로젝트 첨부파일은 배열로 입력해주세요.' })
  @IsUrl(
    {
      protocols: ['http', 'https'],
      require_protocol: true,
    },
    { each: true, message: '프로젝트 첨부파일은 URL 형식으로 입력해주세요.' },
  )
  attach: string[];

  @ApiProperty({
    example: '해킹',
    description: '프로젝트 타입',
  })
  @IsString({ message: '프로젝트 타입은 문자열로 입력해주세요.' })
  type: string;

  @ApiProperty({
    example: 'Layer7',
    description: '프로젝트 동아리',
  })
  @IsString({ message: '프로젝트 동아리명은 문자열로 입력해주세요.' })
  club: string;

  @ApiProperty({
    example: '김병주, 강태영, 이제윤, 박금혁, 김성빈, 표한빈, 백시현',
    description: '프로젝트 참여자',
  })
  @IsString({ message: '프로젝트 참여자는 문자열로 입력해주세요.' })
  participants: string;

  constructor(
    name: string,
    description: string,
    detail: string,
    image: string,
    attach: string[],
    type: string,
    club: string,
    participants: string,
  ) {
    this.name = name;
    this.description = description;
    this.detail = detail;
    this.image = image;
    this.attach = attach;
    this.type = type;
    this.club = club;
    this.participants = participants;
  }
}
