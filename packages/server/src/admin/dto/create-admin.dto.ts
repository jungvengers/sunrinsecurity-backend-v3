import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    example: '21sunrin037@sunrint.hs.kr',
    description: '이메일',
    type: String,
  })
  @IsEmail(
    {},
    {
      message: '이메일 형식으로 입력해주세요.',
    },
  )
  email: string;

  @ApiProperty({ example: 'admin', description: 'admin | none | club.name' })
  role: string;

  constructor(email: string, role: string) {
    this.email = email;
    this.role = role;
  }
}
