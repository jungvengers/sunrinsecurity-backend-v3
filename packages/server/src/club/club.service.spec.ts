import { Test, TestingModule } from '@nestjs/testing';
import { ClubService } from './club.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Club } from './entities/club.entity';
import { RootTestModule } from 'src/__tests__/root.module';
import { Form } from 'src/form/entities/form.entity';

describe('ClubService', () => {
  let service: ClubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RootTestModule, TypeOrmModule.forFeature([Club, Form])],
      providers: [ClubService],
    }).compile();

    service = module.get<ClubService>(ClubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
