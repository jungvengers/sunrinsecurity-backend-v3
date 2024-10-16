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
  CacheInterceptor,
  UseInterceptors,
  CacheTTL,
} from '@nestjs/common';
import { ClubService } from './club.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { AdminGuard } from 'src/admin/guards/admin.guard';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Admin } from 'src/admin/entities/admin.entity';
import ms from 'ms';

@Controller('club')
@CacheTTL(ms('1h'))
@UseInterceptors(CacheInterceptor)
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  create(@Req() req: Request, @Body() createClubDto: CreateClubDto) {
    const admin = req.user as any;
    return this.clubService.create(admin, createClubDto);
  }

  @Get()
  findAll() {
    return this.clubService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clubService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateClubDto: UpdateClubDto,
  ) {
    const admin: Admin = req.user as any;
    return this.clubService.update(admin, +id, updateClubDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  remove(@Req() req: Request, @Param('id') id: string) {
    const admin: Admin = req.user as any;
    return this.clubService.remove(admin, +id);
  }
}
