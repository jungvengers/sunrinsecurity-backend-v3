import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice } from './entities/notice.entity';
import { Repository } from 'typeorm';
import { FindNoticeDto } from './dto/find-notice.dto';
import { Admin } from 'src/admin/entities/admin.entity';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
  ) {}

  async create(admin: Admin, createNoticeDto: CreateNoticeDto) {
    if (admin.role !== 'admin') {
      throw new HttpException('Not admin', HttpStatus.UNAUTHORIZED);
    }
    const item = this.noticeRepository.create(createNoticeDto);
    return this.noticeRepository.save(item);
  }

  async findAll(query: FindNoticeDto) {
    const [items, count] = await this.noticeRepository.findAndCount({
      skip: (query.page - 1) * 10,
      take: 10,
    });
    return {
      items,
      count: count / 10,
    };
  }

  async findOne(id: number) {
    const item = this.noticeRepository.findOneBy({ id });
    return item;
  }

  async update(admin: Admin, id: number, updateNoticeDto: UpdateNoticeDto) {
    if (admin.role !== 'admin') {
      throw new HttpException('Not admin', HttpStatus.UNAUTHORIZED);
    }
    const item = this.noticeRepository.update(id, updateNoticeDto);
    return item;
  }

  async remove(admin: Admin, id: number) {
    if (admin.role !== 'admin') {
      throw new HttpException('Not admin', HttpStatus.UNAUTHORIZED);
    }
    const item = this.noticeRepository.delete(id);
    return item;
  }
}
