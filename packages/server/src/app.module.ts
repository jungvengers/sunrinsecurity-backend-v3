import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NoticeModule } from './notice/notice.module';
import { ProjectModule } from './project/project.module';
import { ClubModule } from './club/club.module';
import { ApplicationModule } from './application/application.module';
import { FormModule } from './form/form.module';
import { DatabaseModule } from './database.module';
import { ConfigValidator } from './validators/config';
import { AdminService } from './admin/admin.service';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`../../.env`, `.env`],
      validationSchema: ConfigValidator,
    }),
    DatabaseModule,
    NoticeModule,
    ProjectModule,
    ClubModule,
    ApplicationModule,
    FormModule,
    AdminModule,
  ],
  controllers: [],
  providers: [AdminService],
})
export class AppModule {}
