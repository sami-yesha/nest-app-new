import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { GatewayModule } from './gateway.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);

  // Hybrid application (HTTP + TCP)
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { host: '0.0.0.0', port: 3001 },
  });
  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('NestJS Microservices API')
    .setDescription('API documentation for NestJS Microservices Gateway')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.startAllMicroservices();
  await app.listen(3000);
  console.log('✅ gateway is running on TCP port 3000');
}
bootstrap();
