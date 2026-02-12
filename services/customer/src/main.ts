import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/error-handler/error-handler.filter';
import { validateConfig } from './common/config/app.config';

async function bootstrap() {
  validateConfig();

  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());

  // app.setGlobalPrefix('/api/v1');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));

  await app.listen(process.env.HTTP_PORT ?? 3000);
}
bootstrap();
