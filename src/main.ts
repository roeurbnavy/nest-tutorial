import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port = config.get('PORT');

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
    }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(port, async () => {
    console.log('[WEB]', `${await app.getUrl()}`);
  });
}
bootstrap();
