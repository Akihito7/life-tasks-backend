import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function configureSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Tasks Life')
    .setDescription('Tasks life API')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('users')
    .addTag('tasks')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
}
