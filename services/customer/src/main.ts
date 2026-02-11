import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  // Initialize with Fastify adapter + custom options
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({}),
  );

  // NestJS-agnostic config (works on any platform)
  app.enableShutdownHooks();
  app.setGlobalPrefix('api');

  // Listen on all interfaces (critical for Docker/cloud)
  await app.listen(3000, '0.0.0.0');
  console.log(`🚀 Application running at ${await app.getUrl()}`);
}

bootstrap();
