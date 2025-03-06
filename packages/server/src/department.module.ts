import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Form } from 'src/form/entities/form.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department, Form])],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}
