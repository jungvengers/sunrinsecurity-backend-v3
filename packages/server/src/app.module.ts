import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NoticeModule } from './notice/notice.module';
import { ProjectModule } from './project/project.module';
import { ClubModule } from './club/club.module';
import { ApplicationModule } from './application/application.module';
import { FormModule } from './form/form.module';
import { DatabaseModule } from './database.module';
import { ConfigValidator } from './validators/config';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { DepartmentModule } from './department/department.module';
import ms from 'ms';
import { Department } from './department/entities/department.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`../../.env`, `.env`],
      validationSchema: ConfigValidator,
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        ttl: ms(config.get<string>('CACHE_TTL', '5s')),
        max: config.get<number>('CACHE_MAX', 100),
      }),
      inject: [ConfigService],
    }),
    DatabaseModule,
    AuthModule,
    NoticeModule,
    ProjectModule,
    ClubModule,
    ApplicationModule,
    FormModule,
    AdminModule,
    UploadModule,
    DepartmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
