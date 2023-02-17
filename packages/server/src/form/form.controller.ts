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
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AdminGuard } from 'src/admin/guards/admin.guard';
import { Request } from 'express';
import { Admin } from 'src/admin/entities/admin.entity';

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formService.find(+id);
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
