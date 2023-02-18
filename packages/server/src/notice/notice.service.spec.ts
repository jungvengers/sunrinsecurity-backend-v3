import { Test, TestingModule } from '@nestjs/testing';
import { NoticeService } from './notice.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notice } from './entities/notice.entity';

describe('NoticeService', () => {
  let service: NoticeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Notice])],
      providers: [NoticeService],
    }).compile();

    service = module.get<NoticeService>(NoticeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
