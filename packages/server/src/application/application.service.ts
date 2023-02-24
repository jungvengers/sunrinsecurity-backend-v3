import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './entities/application.entity';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
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
