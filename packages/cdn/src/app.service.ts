import { Injectable } from '@nestjs/common';
import { UploadFile } from './dto/UploadFile.dto';

@Injectable()
export class AppService {
  upload(file: Express.Multer.File): UploadFile {
    return { location: 'https://example.com' };
  }
}
