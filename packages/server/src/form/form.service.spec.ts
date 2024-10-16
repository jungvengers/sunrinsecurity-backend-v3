import { Test, TestingModule } from '@nestjs/testing';
import { FormService } from './form.service';
import { Form } from './entities/form.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Club } from 'src/club/entities/club.entity';
import { RootTestModule } from 'src/__tests__/root.module';

describe('FormService', () => {
  let service: FormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RootTestModule, TypeOrmModule.forFeature([Club, Form])],
      providers: [FormService],
    }).compile();

    service = module.get<FormService>(FormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
