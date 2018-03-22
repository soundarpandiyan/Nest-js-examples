import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { AnyExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AnyExceptionFilter());
  //app.useGlobalInterceptors(new TransformInterceptor());
  //app.useGlobalInterceptors(new LoggingInterceptor());

  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api', app, document);

  await app.listen(3000);
}
bootstrap();


