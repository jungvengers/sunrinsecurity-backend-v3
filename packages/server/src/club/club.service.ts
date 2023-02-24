import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from './entities/club.entity';
import { Admin } from 'src/admin/entities/admin.entity';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(Club)
    private readonly clubRepository: Repository<Club>,
  ) {}

  async create(admin: Admin, createClubDto: CreateClubDto) {
    if (admin.role !== 'admin') {
      throw new HttpException('Not admin', HttpStatus.UNAUTHORIZED);
    }
    const club = this.clubRepository.create(createClubDto);
    return this.clubRepository.save(club);
  }

  async findAll() {
    const items = this.clubRepository.find();
    return items;
  }

  async findOne(id: number) {
    const item = this.clubRepository.findOneBy({ id });
    if (!item) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return item;
  }

  async update(admin: Admin, id: number, updateClubDto: UpdateClubDto) {
    const item = await this.clubRepository.findOneBy({ id });
    if (admin.role !== 'admin' && admin.role !== item?.name) {
      throw new HttpException('Not admin of club', HttpStatus.UNAUTHORIZED);
    }
    return this.clubRepository.update(id, updateClubDto);
  }

  async remove(admin: Admin, id: number) {
    if (admin.role !== 'admin') {
      throw new HttpException('Not admin', HttpStatus.UNAUTHORIZED);
    }
    return this.clubRepository.delete(id);
  }
}
