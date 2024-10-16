import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

export const allowedFileTypes = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/gif',
  'image/svg+xml',
  'image/webp',
  'text/csv',
  'text/plain',
  'audio/mpeg',
  'audio/webm',
  'video/mp4',
  'video/webm',
  'application/zip',
  'application/x-zip-compressed',
  'application/x-7z-compressed',
  'application/pdf',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

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
