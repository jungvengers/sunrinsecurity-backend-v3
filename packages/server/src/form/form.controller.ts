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
import { TimeLimitFromConfigGuard } from 'src/guards/timelimit.guard';

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Get(':id')
  @UseGuards(TimeLimitFromConfigGuard('FORM_START_TIME', 'FORM_END_TIME'))
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

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateFormDto: UpdateFormDto,
  ) {
    const admin: Admin = req.user as any;
    return this.formService.update(admin, +id, updateFormDto);
  }
}
