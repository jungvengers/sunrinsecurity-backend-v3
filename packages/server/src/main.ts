import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { swagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const servicePort = config.get<string>('PORT', '3000');
  const NODE_ENV = config.get<string>('NODE_ENV', 'development');

  app.use(cookieParser());
  app.enableCors({
    origin: [
      config.get<string>('CORS_ORIGIN', '*'),
      RegExp(
        config.get<string>(
          'CORS_PREVIEW_ORIGIN',
          '^https?://[a-z0-9]+.[a-zA-Z0-9-]+.pages.dev',
        ),
      ),
    ],
    methods: config.get<string>(
      'CORS_METHODS',
      'GET,HEAD,PUT,PATCH,POST,DELETE',
    ),
    credentials: config.get<boolean>('CORS_CREDENTIALS', true),
    preflightContinue: config.get<boolean>('CORS_PREFLIGHT', false),
    optionsSuccessStatus: config.get<number>('CORS_OPTIONS_STATUS', 204),
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  if (config.get<boolean>('SWAGGER_ENABLED', NODE_ENV === 'development')) {
    await swagger(app);
  }

  await app.listen(servicePort);

  Logger.log(
    `Server is running on localhost:${servicePort} with ${NODE_ENV} mode`,
    'Bootstrap',
  );
}
bootstrap();
