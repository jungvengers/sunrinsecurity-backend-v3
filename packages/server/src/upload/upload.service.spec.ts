import { Test, TestingModule } from '@nestjs/testing';
import { UploadService } from './upload.service';
import { RootTestModule } from 'src/__tests__/root.module';

describe('UploadService', () => {
  let service: UploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RootTestModule],
      providers: [UploadService],
    }).compile();

    service = module.get<UploadService>(UploadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
