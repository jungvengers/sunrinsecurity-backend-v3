import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { Admin } from 'src/admin/entities/admin.entity';
import { Form } from 'src/form/entities/form.entity';
import { compare } from 'src/utils/compare.string';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly DepartmentRepository: Repository<Department>,
    @InjectRepository(Form)
    private readonly formRepository: Repository<Form>,
  ) {}

  async create(admin: Admin, createDepartmentDto: CreateDepartmentDto) {
    if (admin.role !== 'admin') {
      throw new HttpException('Not admin', HttpStatus.UNAUTHORIZED);
    }
    const Department = this.DepartmentRepository.create({ ...createDepartmentDto, form: {} });
    return this.DepartmentRepository.save(Department);
  }

  async findAll() {
    const items = this.DepartmentRepository.find();
    return items;
  }

  async findOne(id: number) {
    const item = this.DepartmentRepository.findOneBy({ id });
    if (!item) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return item;
  }

  async update(admin: Admin, id: number, updateDepartmentDto: UpdateDepartmentDto) {
    const item = await this.DepartmentRepository.findOneBy({ id });
    if (admin.role !== 'admin' && !compare(admin.role, item?.name)) {
      throw new HttpException('Not admin of Department', HttpStatus.UNAUTHORIZED);
    }
    return this.DepartmentRepository.update(id, updateDepartmentDto);
  }

  async remove(admin: Admin, id: number) {
    if (admin.role !== 'admin') {
      throw new HttpException('Not admin', HttpStatus.UNAUTHORIZED);
    }
    return this.DepartmentRepository.delete(id);
  }
}
