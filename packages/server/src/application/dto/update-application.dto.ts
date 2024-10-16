import { OmitType } from '@nestjs/swagger';
import { CreateApplicationDto } from './create-application.dto';

export class UpdateApplicationDto extends OmitType(CreateApplicationDto, [
  'clubid',
]) {}
