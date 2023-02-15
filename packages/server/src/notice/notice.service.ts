import { Injectable } from '@nestjs/common';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice } from './entities/notice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
  ) {}

  create(createNoticeDto: CreateNoticeDto) {
    const item = this.noticeRepository.create(createNoticeDto);
    return this.noticeRepository.save(item);
  }

  findAll() {
    const items = this.noticeRepository.find();
    return items;
  }

  findOne(id: number) {
    const item = this.noticeRepository.findOneBy({ id });
    return item;
  }

  update(id: number, updateNoticeDto: UpdateNoticeDto) {
    const item = this.noticeRepository.update(id, updateNoticeDto);
    return item;
  }

  remove(id: number) {
    const item = this.noticeRepository.delete(id);
    return item;
  }
}
