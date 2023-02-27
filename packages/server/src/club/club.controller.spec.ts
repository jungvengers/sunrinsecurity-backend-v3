import { Test, TestingModule } from '@nestjs/testing';
import { ClubController } from './club.controller';
import { ClubService } from './club.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Club } from './entities/club.entity';
import { RootTestModule } from 'src/__tests__/root.module';
import { Form } from 'src/form/entities/form.entity';

jest.mock('typeorm');

describe('ClubController', () => {
  let controller: ClubController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RootTestModule, TypeOrmModule.forFeature([Club, Form])],
      controllers: [ClubController],
      providers: [ClubService],
    }).compile();

    controller = module.get<ClubController>(ClubController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
