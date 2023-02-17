import { Injectable } from '@nestjs/common';
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
    const item = await this.applicationRepository.create({
      email: user.email,
      club: { id: createApplicationDto.clubid },
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
