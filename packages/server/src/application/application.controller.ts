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

@Controller('application')
@ApiBearerAuth()
@UseGuards(AccessGuard)
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  create(
    @Req() req: Request,
    @Body() createApplicationDto: CreateApplicationDto,
  ) {
    if (!req.user) {
      throw new HttpException('Not logged in', 401);
    }
    return this.applicationService.create(req.user, createApplicationDto);
  }

  @Get(':clubid')
  find(@Req() req: Request, @Param('clubid') clubid: string) {
    if (!req.user) {
      throw new HttpException('Not logged in', 401);
    }
    return this.applicationService.find(req.user, +clubid);
  }

  @Patch(':clubid')
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
  remove(@Req() req: Request, @Param('clubid') clubid: string) {
    if (!req.user) {
      throw new HttpException('Not logged in', 401);
    }
    return this.applicationService.remove(req.user, +clubid);
  }
}
