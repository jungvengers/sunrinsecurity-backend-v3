import { ApiProperty } from '@nestjs/swagger';
import { AdminRole } from '../entities/admin.entity';
import { IsEmail, IsEnum } from 'class-validator';

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

  @ApiProperty({ example: 'admin', description: '권한', enum: AdminRole })
  @IsEnum(AdminRole, {
    message: '권한이 올바르지 않습니다.',
  })
  role: AdminRole;

  constructor(email: string, role: AdminRole) {
    this.email = email;
    this.role = role;
  }
}
