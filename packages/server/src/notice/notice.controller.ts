import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  CacheInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { NoticeService } from './notice.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/admin/guards/admin.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FindNoticeDto } from './dto/find-notice.dto';
import { Request } from 'express';
import { Admin } from 'src/admin/entities/admin.entity';

@Controller('notice')
@UseInterceptors(CacheInterceptor)
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  create(@Req() req: Request, @Body() createNoticeDto: CreateNoticeDto) {
    const admin: Admin = req.user as any;
    return this.noticeService.create(admin, createNoticeDto);
  }

  @Get()
  findAll(@Query() query: FindNoticeDto) {
    return this.noticeService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noticeService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateNoticeDto: UpdateNoticeDto,
  ) {
    const admin: Admin = req.user as any;
    return this.noticeService.update(admin, +id, updateNoticeDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  remove(@Req() req: Request, @Param('id') id: string) {
    const admin: Admin = req.user as any;
    return this.noticeService.remove(admin, +id);
  }
}
