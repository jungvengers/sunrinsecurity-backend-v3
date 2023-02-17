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
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AccessGuard } from 'src/auth/guards/access.guard';
import { Request } from 'express';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AccessGuard)
  create(
    @Req() req: Request,
    @Body() createApplicationDto: CreateApplicationDto,
  ) {
    return this.applicationService.create(req.user!, createApplicationDto);
  }

  @Get(':clubid')
  find(@Req() req: Request, @Param('clubid') clubid: string) {
    return this.applicationService.find(req.user!, +clubid);
  }

  @Patch(':clubid')
  update(
    @Req() req: Request,
    @Param('clubid') clubid: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ) {
    return this.applicationService.update(
      req.user!,
      +clubid,
      updateApplicationDto,
    );
  }

  @Delete(':clubid')
  remove(@Req() req: Request, @Param('clubid') clubid: string) {
    return this.applicationService.remove(req.user!, +clubid);
  }
}
