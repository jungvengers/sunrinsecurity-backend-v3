import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import * as uuid from 'uuid';

@Injectable()
export class UploadService {
  private readonly s3Storage: AWS.S3;
  private readonly awsS3Bucket: string;

  constructor(private readonly configService: ConfigService) {
    this.s3Storage = new AWS.S3({
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
    });
    this.awsS3Bucket = this.configService.get<string>('AWS_S3_BUCKET')!;
  }

  public async uploadFile(file: Express.Multer.File) {
    const params = {
      Bucket: this.awsS3Bucket,
      Key: `${uuid.v4()}-${file.originalname}`,
      Body: file.buffer,
    };

    const result = await this.s3Storage.upload(params).promise();

    return { location: result.Location };
  }
}
