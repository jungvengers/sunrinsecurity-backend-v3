import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Project } from './project/entities/project.entity';
import { Club } from './club/entities/club.entity';
import { Notice } from './notice/entities/notice.entity';
import { Form } from './form/entities/form.entity';
import { Application } from './application/entities/application.entity';
import { Admin } from './admin/entities/admin.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        database: config.get<string>('POSTGRES_DB'),
        username: config.get<string>('POSTGRES_USER'),
        password: config.get<string>('POSTGRES_PASSWORD'),
        entities: [Project, Club, Notice, Form, Application, Admin],
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
