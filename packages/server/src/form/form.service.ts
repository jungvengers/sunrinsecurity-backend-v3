import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Form } from './entities/form.entity';
import { Admin } from 'src/admin/entities/admin.entity';
import { Club } from 'src/club/entities/club.entity';
import { compare } from 'src/utils/compare.string';

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form)
    private readonly formRepository: Repository<Form>,
    @InjectRepository(Club)
    private readonly clubRepository: Repository<Club>,
  ) {}

  async find(clubid: number) {
    const item = await this.formRepository.findOneBy({
      club: { id: clubid },
    });
    return item;
  }

  async create(admin: Admin, createFormDto: CreateFormDto) {
    const club = await this.clubRepository.findOneBy({
      id: createFormDto.clubid,
    });
    if (!club) {
      throw new HttpException('Club not found', HttpStatus.NOT_FOUND);
    }
    if (admin.role !== 'admin' && compare(admin.role, club?.name)) {
      throw new HttpException('Not admin of club', HttpStatus.UNAUTHORIZED);
    }
    const item = {
      ...createFormDto,
      clubid: undefined,
      club,
    };
    const entity = this.formRepository.create(item);
    return this.formRepository.save(entity);
  }

  async update(admin: Admin, clubid: number, updateFormDto: UpdateFormDto) {
    const club = await this.clubRepository.findOneBy({ id: clubid });
    if (!club) {
      throw new HttpException('Club not found', HttpStatus.NOT_FOUND);
    }
    if (admin.role !== 'admin' && compare(admin.role, club?.name)) {
      throw new HttpException('Not admin of club', HttpStatus.UNAUTHORIZED);
    }
    const item = {
      ...updateFormDto,
      clubid: undefined,
      club,
    };
    return this.formRepository.update({ club: { id: clubid } }, item);
  }
}
