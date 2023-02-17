import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

export const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('No file uploaded');
    }

    if (!allowedFileTypes.includes(file.mimetype)) {
      throw new Error('Invalid file type');
    }

    return await this.uploadService.uploadFile(file);
  }
}
