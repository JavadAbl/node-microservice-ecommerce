import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/error-handler/error-handler.filter';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  // validateConfig();

  const app = await NestFactory.create(AppModule);

  /*  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: { urls: ['amqp://localhost:5672'], queue: 'cats_queue', queueOptions: { durable: false } },
  }); */

  app.useGlobalFilters(new AllExceptionsFilter());

  // app.setGlobalPrefix('/api/v1');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));

  const configService = app.get(ConfigService);
  const port = configService.get('app').HTTP_PORT;
  console.log(port);

  await app.listen(process.env.HTTP_PORT || 3023);
}
bootstrap();
