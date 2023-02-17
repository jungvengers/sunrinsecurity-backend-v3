import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { AdminStrategy } from './strategies/admin.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  controllers: [AdminController],
  providers: [AdminService, AdminStrategy],
  exports: [AdminService],
})
export class AdminModule {}
