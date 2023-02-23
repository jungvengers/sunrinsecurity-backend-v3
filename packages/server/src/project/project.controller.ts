import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Query,
  CacheInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Request } from 'express';
import { AdminGuard } from 'src/admin/guards/admin.guard';
import { FindProjectDto } from './dto/find-project.dto';
import { Admin } from 'src/admin/entities/admin.entity';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('project')
@UseInterceptors(CacheInterceptor)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  create(@Req() req: Request, @Body() createProjectDto: CreateProjectDto) {
    const admin: Admin = req.user as any;
    return this.projectService.create(admin, createProjectDto);
  }

  @Get()
  findAll(@Query() query: FindProjectDto) {
    return this.projectService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    const admin: Admin = req.user as any;
    return this.projectService.update(admin, +id, updateProjectDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  remove(@Req() req: Request, @Param('id') id: string) {
    const admin: Admin = req.user as any;
    return this.projectService.remove(admin, +id);
  }
}
