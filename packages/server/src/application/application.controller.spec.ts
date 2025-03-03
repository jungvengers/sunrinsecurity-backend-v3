import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { RootTestModule } from 'src/__tests__/root.module';
import { Club } from 'src/club/entities/club.entity';

describe('ApplicationController', () => {
  let controller: ApplicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RootTestModule, TypeOrmModule.forFeature([Application, Club])],
      controllers: [ApplicationController],
      providers: [ApplicationService],
    }).compile();

    controller = module.get<ApplicationController>(ApplicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
