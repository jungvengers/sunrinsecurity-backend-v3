import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async createAdmin(email: string) {
    const admin = new Admin();
    admin.email = email;
    await this.adminRepository.save(admin);
  }

  async getAdmin(email: string) {
    return await this.adminRepository.findOneBy({
      email,
    });
  }
}
