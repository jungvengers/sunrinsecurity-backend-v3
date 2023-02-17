import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({
    example: '선린라이프 해킹 시연',
    description: '프로젝트 이름',
  })
  name: string;

  @ApiProperty({
    example:
      'CVE-2024-3156을 이용해서 선린라이프를 해킹하는 시연 프로젝트입니다.',
    description: '프로젝트 설명',
  })
  description: string;

  @ApiProperty({
    example:
      '선린라이프 백엔드 개발자인 김형진과의 불화로 인하여 김형진에게 한방 먹여주기 위하여 선린라이프를 해킹하는 시연 프로젝트입니다.',
    description: '프로젝트 상세 설명',
  })
  detail: string;

  @ApiProperty({
    example:
      'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_92x30dp.png',
    description: '프로젝트 이미지',
  })
  image: string;

  @ApiProperty({
    example: '해킹',
    description: '프로젝트 타입',
  })
  type: string;

  @ApiProperty({
    example: 'Layer7',
    description: '프로젝트 동아리',
  })
  club: string;

  @ApiProperty({
    example: '김병주, 강태영, 이제윤, 박금혁, 김성빈, 표한빈, 백시현',
    description: '프로젝트 참여자',
  })
  participants: string;

  constructor(
    name: string,
    description: string,
    detail: string,
    image: string,
    type: string,
    club: string,
    participants: string,
  ) {
    this.name = name;
    this.description = description;
    this.detail = detail;
    this.image = image;
    this.type = type;
    this.club = club;
    this.participants = participants;
  }
}
