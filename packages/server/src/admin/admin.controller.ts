import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AdminGuard } from './guards/admin.guard';
import { DebugGuard } from './guards/debug.guard';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminService } from './admin.service';
import { Request } from 'express';
import { AccessGuard } from 'src/auth/guards/access.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  getAdmin(@Req() req: Request) {
    return req.user;
  }

  @Post()
  @UseGuards(DebugGuard)
  createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto.email);
  }

  @Get('regist')
  @ApiBearerAuth()
  @UseGuards(AccessGuard, DebugGuard)
  registAdmin(@Req() req: Request) {
    return this.adminService.createAdmin(req.user!.email);
  }
}
