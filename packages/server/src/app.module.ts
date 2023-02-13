import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NoticeModule } from './notice/notice.module';
import { ProjectModule } from './project/project.module';
import { ClubModule } from './club/club.module';
import { ApplicationModule } from './application/application.module';
import { FormModule } from './form/form.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`../../../.env`, `.env`],
    }),
    NoticeModule,
    ProjectModule,
    ClubModule,
    ApplicationModule,
    FormModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
