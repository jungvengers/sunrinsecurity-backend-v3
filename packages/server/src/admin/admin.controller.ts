import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AdminGuard } from './guards/admin.guard';
import { DebugGuard } from './guards/debug.guard';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminService } from './admin.service';
import { Request } from 'express';
import { AccessGuard } from 'src/auth/guards/access.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @UseGuards(AdminGuard)
  getAdmin() {
    return true;
  }

  @Post()
  @UseGuards(DebugGuard)
  createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto.email);
  }

  @Get('regist')
  @UseGuards([AccessGuard, DebugGuard])
  registAdmin(@Req() req: Request) {
    return this.adminService.createAdmin(req.user!.email);
  }
}
