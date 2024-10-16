import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { Club } from 'src/club/entities/club.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Application, Club])],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
