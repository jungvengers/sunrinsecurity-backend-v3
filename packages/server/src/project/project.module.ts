import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), AdminModule],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
