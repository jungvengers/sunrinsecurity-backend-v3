import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { AdminService } from 'src/admin/admin.service';
import { FindProjectDto } from './dto/find-project.dto';
import { Admin } from 'src/admin/entities/admin.entity';
import { compare } from 'src/utils/compare.string';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly adminService: AdminService,
  ) {}

  async create(admin: Admin, createProjectDto: CreateProjectDto) {
    if (admin.role !== 'admin' && compare(admin.role, createProjectDto.club)) {
      throw new HttpException('Not admin of club', HttpStatus.UNAUTHORIZED);
    }
    const project = this.projectRepository.create(createProjectDto);
    return this.projectRepository.save(project);
  }

  async findAll(query: FindProjectDto) {
    const [items, count] = await this.projectRepository.findAndCount({
      select: [
        'id',
        'name',
        'description',
        'image',
        'type',
        'club',
        'participants',
      ],
      skip: (query.page - 1) * 4,
      take: 4,
      order: {
        id: 'DESC',
      },
    });
    return {
      items,
      count: Math.ceil(count / 4),
    };
  }

  async findOne(id: number) {
    const item = this.projectRepository.findOneBy({ id });
    if (!item) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return item;
  }

  async update(admin: Admin, id: number, updateProjectDto: UpdateProjectDto) {
    if (admin.role !== 'admin' && compare(admin.role, updateProjectDto.club)) {
      throw new HttpException('Not admin of club', HttpStatus.UNAUTHORIZED);
    }
    if (admin.role !== 'admin') {
      return this.projectRepository.update(
        { id, name: admin.role },
        updateProjectDto,
      );
    } else {
      return this.projectRepository.update(id, updateProjectDto);
    }
  }

  async remove(admin: Admin, id: number) {
    const item = await this.projectRepository.findOneBy({ id });
    if (admin.role !== 'admin' && compare(admin.role, item?.club)) {
      throw new HttpException('Not admin of club', HttpStatus.UNAUTHORIZED);
    }
    return this.projectRepository.delete(id);
  }
}
