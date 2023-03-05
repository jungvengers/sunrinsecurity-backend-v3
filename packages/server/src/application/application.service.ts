import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './entities/application.entity';
import { Admin } from 'src/admin/entities/admin.entity';
import { compare } from 'src/utils/compare.string';
import { Club } from 'src/club/entities/club.entity';
import { studentId } from 'src/utils/studentid.string';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
    @InjectRepository(Club)
    private readonly clubRepository: Repository<Club>,
  ) {}

  async create(user: Express.User, createApplicationDto: CreateApplicationDto) {
    const apps = await this.applicationRepository.countBy({
      email: user.email,
    });
    if (apps >= 3)
      throw new HttpException(
        '3개 이상 지원할 수 없습니다.',
        HttpStatus.BAD_REQUEST,
      );
    const item = await this.applicationRepository.create({
      email: user.email,
      name: user.username,
      studentId: studentId(user),
      club: { id: createApplicationDto.clubid },
      phone: createApplicationDto.phone,
      answer1: createApplicationDto.answer1,
      answer2: createApplicationDto.answer2,
      answer3: createApplicationDto.answer3,
      answer4: createApplicationDto.answer4,
      answer5: createApplicationDto.answer5,
      answer6: createApplicationDto.answer6,
      answer7: createApplicationDto.answer7,
      answer8: createApplicationDto.answer8,
      answer9: createApplicationDto.answer9,
      answer10: createApplicationDto.answer10,
    });
    return await this.applicationRepository.save(item);
  }

  async findAllByClubId(admin: Admin, clubid: number) {
    const item = await this.clubRepository.findOneBy({ id: clubid });
    if (admin.role !== 'admin' && !compare(admin.role, item?.name)) {
      throw new HttpException('Not admin of club', HttpStatus.UNAUTHORIZED);
    }
    const items = await this.applicationRepository.find({
      where: { club: { id: clubid } },
    });
    return items;
  }

  async findAll(user: Express.User) {
    const items = await this.applicationRepository.find({
      where: { email: user.email },
      relations: ['club'],
    });
    return items;
  }

  async find(user: Express.User, clubid: number) {
    const item = this.applicationRepository.findOneBy({
      email: user.email,
      club: { id: clubid },
    });
    return item;
  }

  async update(
    user: Express.User,
    clubid: number,
    updateApplicationDto: UpdateApplicationDto,
  ) {
    delete updateApplicationDto.clubid;
    return this.applicationRepository.update(
      { email: user.email, club: { id: clubid } },
      updateApplicationDto,
    );
  }

  async remove(user: Express.User, clubid: number) {
    return this.applicationRepository.delete({
      email: user.email,
      club: { id: clubid },
    });
  }
}
