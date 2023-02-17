import { ApiProperty } from '@nestjs/swagger';

export class CreateNoticeDto {
  @ApiProperty({
    example: '선린라이프 서비스 중단 알림',
    description: '공지사항 제목',
  })
  title: string;

  @ApiProperty({
    example:
      '<h1>학교 내 인트라넷 서비스인 선린라이프는 2024년 1월 1일 신년맞이 해킹으로 인하여<br>저장된 모든 데이터가 날라가서 2년간의 서비스 제공을 마지막으로 잠정적으로 서비스를 중단합니다.</h1>',
    description: '공지사항 내용',
  })
  content: string;

  @ApiProperty({ example: '박금혁', description: '작성자' })
  author: string;

  constructor(title: string, content: string, author: string) {
    this.title = title;
    this.content = content;
    this.author = author;
  }
}
