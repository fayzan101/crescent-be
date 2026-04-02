import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import express from 'express';

let cachedApp: any;

async function bootstrapServer() {
  if (!cachedApp) {
    const expressApp = express();
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Crescent API')
      .setDescription('Serverless Swagger entrypoint. OpenAPI JSON available at `/api-json`.')
      .setVersion('1.0')
      .build();
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

    expressApp.get(['/', '/swagger'], (_req, res) => {
      res.sendFile(join(process.cwd(), 'api', 'swagger-index.html'));
    });
    expressApp.get('/api-json', (_req, res) => {
      res.json(swaggerDocument);
    });
    await app.init();
    cachedApp = expressApp;
  }
  return cachedApp;
}

export default async function handler(req: any, res: any) {
  const app = await bootstrapServer();
  return app(req, res);
}
