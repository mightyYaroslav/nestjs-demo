import { NestFactory } from '@nestjs/core'
import { AppModule } from './AppModule'
import { ValidationPipe } from './configuration/ValidationPipe'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console
  })
  app.useGlobalPipes(new ValidationPipe())
  const options = new DocumentBuilder()
    .setTitle('Calendar app')
    .setDescription('The API for calendar')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)
  await app.listen(3000)
}

bootstrap()
