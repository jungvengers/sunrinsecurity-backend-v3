import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpException,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AccessGuard } from 'src/auth/guards/access.guard';
import { Request } from 'express';
import { TimeLimitFromConfigGuard } from 'src/guards/timelimit.guard';
import { AdminGuard } from 'src/admin/guards/admin.guard';
import { Admin } from 'src/admin/entities/admin.entity';

@Controller('application')
@ApiBearerAuth()
@UseGuards(AccessGuard)
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @UseGuards(
    TimeLimitFromConfigGuard('APPLICATION_START_TIME', 'APPLICATION_END_TIME'),
  )
  create(
    @Req() req: Request,
    @Body() createApplicationDto: CreateApplicationDto,
  ) {
    if (!req.user) {
      throw new HttpException('Not logged in', 401);
    }
    return this.applicationService.create(req.user, createApplicationDto);
  }

  @Get()
  findAll(@Req() req: Request) {
    if (!req.user) {
      throw new HttpException('Not logged in', 401);
    }
    return this.applicationService.findAll(req.user);
  }

  @Get(':clubid')
  @UseGuards(
    TimeLimitFromConfigGuard('APPLICATION_START_TIME', 'APPLICATION_END_TIME'),
  )
  find(@Req() req: Request, @Param('clubid') clubid: string) {
    if (!req.user) {
      throw new HttpException('Not logged in', 401);
    }
    return this.applicationService.find(req.user, +clubid);
  }

  @Get(':clubid/admin')
  @UseGuards(AdminGuard)
  findAllByClubId(@Req() req: Request, @Param('clubid') clubid: string) {
    const admin: Admin = req.user as any;
    return this.applicationService.findAllByClubId(admin, +clubid);
  }

  @Patch(':clubid')
  @UseGuards(
    TimeLimitFromConfigGuard('APPLICATION_START_TIME', 'APPLICATION_END_TIME'),
  )
  update(
    @Req() req: Request,
    @Param('clubid') clubid: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ) {
    if (!req.user) {
      throw new HttpException('Not logged in', 401);
    }
    return this.applicationService.update(
      req.user,
      +clubid,
      updateApplicationDto,
    );
  }

  @Delete(':clubid')
  @UseGuards(
    TimeLimitFromConfigGuard('APPLICATION_START_TIME', 'APPLICATION_END_TIME'),
  )
  remove(@Req() req: Request, @Param('clubid') clubid: string) {
    if (!req.user) {
      throw new HttpException('Not logged in', 401);
    }
    return this.applicationService.remove(req.user, +clubid);
  }
}
