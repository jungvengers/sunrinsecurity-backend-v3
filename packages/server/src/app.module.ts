import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HelloModule } from './hello/hello.module';
import { NoticeModule } from './notice/notice.module';
import { ProjectModule } from './project/project.module';
import { ClubModule } from './club/club.module';
import { ProjectModule } from './project/project.module';
import { NoticeModule } from './notice/notice.module';
import { ClubModule } from './club/club.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`../../../.env`, `.env`],
    }),
    HelloModule,
    NoticeModule,
    ProjectModule,
    ClubModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
