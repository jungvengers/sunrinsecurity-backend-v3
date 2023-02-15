import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NoticeModule } from './notice/notice.module';
import { ProjectModule } from './project/project.module';
import { ClubModule } from './club/club.module';
import { ApplicationModule } from './application/application.module';
import { FormModule } from './form/form.module';
import { DatabaseModule } from './database.module';
import { ConfigValidator } from './validators/config';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`../../.env`, `.env`],
      validationSchema: ConfigValidator,
    }),
    DatabaseModule,
    AuthModule,
    NoticeModule,
    ProjectModule,
    ClubModule,
    ApplicationModule,
    FormModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
