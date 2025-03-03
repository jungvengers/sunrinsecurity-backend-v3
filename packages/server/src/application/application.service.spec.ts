import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationService } from './application.service';
import { Application } from './entities/application.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RootTestModule } from 'src/__tests__/root.module';
import { Club } from 'src/club/entities/club.entity';

describe('ApplicationService', () => {
  let service: ApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RootTestModule, TypeOrmModule.forFeature([Application, Club])],
      providers: [ApplicationService],
    }).compile();

    service = module.get<ApplicationService>(ApplicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
