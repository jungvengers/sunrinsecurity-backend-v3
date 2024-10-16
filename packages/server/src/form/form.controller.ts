import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AdminGuard } from 'src/admin/guards/admin.guard';
import { Request } from 'express';
import { Admin } from 'src/admin/entities/admin.entity';
import { TimeLimitGuard } from './guards/timelimit.guard';

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(TimeLimitGuard)
  findOne(@Param('id') id: string) {
    return this.formService.find(+id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  create(@Req() req: Request, @Body() createFormDto: CreateFormDto) {
    const admin: Admin = req.user as any;
    return this.formService.create(admin, createFormDto);
  }

  @Patch(':clubid')
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  update(
    @Req() req: Request,
    @Param('clubid') clubid: string,
    @Body() updateFormDto: UpdateFormDto,
  ) {
    const admin: Admin = req.user as any;
    return this.formService.update(admin, +clubid, updateFormDto);
  }
}
