import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from './guards/admin.guard';
import { DebugGuard } from './guards/debug.guard';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminService } from './admin.service';
import { Request } from 'express';
import { AccessGuard } from 'src/auth/guards/access.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { TimeLimitFromConfigGuard } from 'src/guards/timelimit.guard';

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
    return this.adminService.createAdmin(
      createAdminDto.email,
      createAdminDto.role,
    );
  }

  @Get('regist')
  @ApiBearerAuth()
  @UseGuards(AccessGuard, DebugGuard)
  registAdmin(@Req() req: Request) {
    if (!req.user) {
      throw new HttpException('Not logged in', 401);
    }
    return this.adminService.createAdmin(req.user.email);
  }
}
