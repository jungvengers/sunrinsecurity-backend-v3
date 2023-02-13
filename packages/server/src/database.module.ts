import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Project } from './project/entities/project.entity';
import { Club } from './club/entities/club.entity';
import { Notice } from './notice/entities/notice.entity';
import { Form } from './form/entities/form.entity';
import { Application } from './application/entities/application.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        database: config.get<string>('DB_NAME'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        entities: [Project, Club, Notice, Form, Application],
        migrations: [],
        subscribers: [],
        synchronize: true,
        charset: 'utf8_general_ci',
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
