import { ApiProperty } from '@nestjs/swagger';
import { AdminRole } from '../entities/admin.entity';

export class CreateAdminDto {
  @ApiProperty({
    example: '21sunrin037@sunrint.hs.kr',
    description: '이메일',
    type: String,
  })
  email: string;

  @ApiProperty({ example: 'admin', description: '권한', enum: AdminRole })
  role: AdminRole;

  constructor(email: string, role: AdminRole) {
    this.email = email;
    this.role = role;
  }
}
