import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Admin } from 'src/admin/entities/admin.entity';
import { Application } from 'src/application/entities/application.entity';
import { Club } from 'src/club/entities/club.entity';
import { Form } from 'src/form/entities/form.entity';
import { Notice } from 'src/notice/entities/notice.entity';
import { Project } from 'src/project/entities/project.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`../../.env`, `.env`],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'sqlite',
        database: ':memory:',
        entities: [Project, Club, Notice, Form, Application, Admin],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class RootTestModule {}
