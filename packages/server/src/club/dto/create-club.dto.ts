import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsString, IsUrl, ValidateNested } from 'class-validator';

export class CreateClubDto {
  @ApiProperty({ example: 'Layer7', description: '동아리 이름' })
  @IsString({ message: '동아리 이름은 문자열로 입력해주세요.' })
  name!: string;

  @ApiProperty({
    example:
      'Layer7은 선린인터넷고등학교가 서울시 최초 IT 특성화고등학교로 지정된 2001년부터 학교와 함께해왔습니다. 보안에 관심 있는 학생들이 모여 동아리를 만들고, 해킹이라는 흔치 않은 분야에서 서로가 서로를 도우며 보안을 공부해왔습니다. 체계적인 커리큘럼과 동아리 부원들의 열정, 책임감은 22년이라는 역사를 뒷받침해왔습니다.',
    description: '동아리 설명',
  })
  @IsString({ message: '동아리 설명은 문자열로 입력해주세요.' })
  description!: string;

  @ApiProperty({
    example:
      'Layer7은 선린인터넷고등학교가 서울시 최초 IT 특성화고등학교로 지정된 2001년부터 학교와 함께해왔습니다.',
    description: '동아리 커리큘럼',
  })
  @IsString({ message: '동아리 커리큘럼은 문자열로 입력해주세요.' })
  curriculum!: string;

  @ApiProperty({
    example:
      'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_92x30dp.png',
    description: '동아리 이미지',
  })
  @IsUrl(
    {
      protocols: ['http', 'https'],
      require_protocol: true,
    },
    { message: '동아리 이미지는 URL 형식으로 입력해주세요.' },
  )
  image!: string;

  @ApiProperty({
    example: [
      {
        image:
          'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_92x30dp.png',
        name: '구글',
        link: 'https://google.com',
      },
    ],
    description: '동아리 링크',
  })
  @IsArray({ message: '동아리 링크는 배열 형식으로 입력해주세요.' })
  @ValidateNested({ each: true })
  @Type(() => ClubLinkDto)
  links!: ClubLinkDto[];
}

export class ClubLinkDto {
  @ApiProperty({
    example:
      'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_92x30dp.png',
    description: '링크 이미지',
  })
  @IsUrl(
    {
      protocols: ['http', 'https'],
      require_protocol: true,
    },
    { message: '링크 이미지는 URL 형식으로 입력해주세요.' },
  )
  image!: string;

  @ApiProperty({ example: '구글', description: '링크 이름' })
  @IsString({ message: '링크 이름은 문자열로 입력해주세요.' })
  name!: string;

  @ApiProperty({
    example: 'https://google.com',
    description: '링크',
  })
  @IsUrl(
    {
      protocols: ['http', 'https'],
      require_protocol: true,
    },
    { message: '링크는 URL 형식으로 입력해주세요.' },
  )
  link!: string;
}
