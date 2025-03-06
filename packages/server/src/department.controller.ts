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
  import { DepartmentService } from './department.service';
  import { CreateDepartmentDto } from './dto/create-department.dto';
  import { UpdateDepartmentDto } from './dto/update-department.dto';
  import { AdminGuard } from 'src/admin/guards/admin.guard';
  import { Request } from 'express';
  import { ApiBearerAuth } from '@nestjs/swagger';
  import { Admin } from 'src/admin/entities/admin.entity';
  import ms from 'ms';
  
  @Controller('Department')
  @CacheTTL(ms('1h'))
  @UseInterceptors(CacheInterceptor)
  export class DepartmentController {
    constructor(private readonly DepartmentService: DepartmentService) {}
  
    @Post()
    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    create(@Req() req: Request, @Body() createDepartmentDto: CreateDepartmentDto) {
      const admin = req.user as any;
      return this.DepartmentService.create(admin, createDepartmentDto);
    }
  
    @Get()
    findAll() {
      return this.DepartmentService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.DepartmentService.findOne(+id);
    }
  
    @Patch(':id')
    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    update(
      @Req() req: Request,
      @Param('id') id: string,
      @Body() updateDepartmentDto: UpdateDepartmentDto,
    ) {
      const admin: Admin = req.user as any;
      return this.DepartmentService.update(admin, +id, updateDepartmentDto);
    }
  
    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    remove(@Req() req: Request, @Param('id') id: string) {
      const admin: Admin = req.user as any;
      return this.DepartmentService.remove(admin, +id);
    }
  }
  