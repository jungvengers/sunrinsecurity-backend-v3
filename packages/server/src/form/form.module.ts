import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from './entities/form.entity';
import { Club } from 'src/club/entities/club.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Form, Club])],
  controllers: [FormController],
  providers: [FormService],
})
export class FormModule {}
