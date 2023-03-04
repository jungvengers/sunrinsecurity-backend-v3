import { Test, TestingModule } from '@nestjs/testing';
import { FormController } from './form.controller';
import { FormService } from './form.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Club } from 'src/club/entities/club.entity';
import { Form } from './entities/form.entity';
import { RootTestModule } from 'src/__tests__/root.module';
import { AdminModule } from 'src/admin/admin.module';
import { JwtService } from '@nestjs/jwt';

describe('FormController', () => {
  let controller: FormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        RootTestModule,
        TypeOrmModule.forFeature([Club, Form]),
        AdminModule,
      ],
      controllers: [FormController],
      providers: [FormService, JwtService],
    }).compile();

    controller = module.get<FormController>(FormController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
