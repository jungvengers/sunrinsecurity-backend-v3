import { Test, TestingModule } from '@nestjs/testing';
import { ClubController } from './club.controller';
import { ClubService } from './club.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Club } from './entities/club.entity';
import { Application } from 'src/application/entities/application.entity';

jest.mock('typeorm');

describe('ClubController', () => {
  let controller: ClubController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Club, Application],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Club]),
      ],
      controllers: [ClubController],
      providers: [ClubService],
    }).compile();

    controller = module.get<ClubController>(ClubController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
