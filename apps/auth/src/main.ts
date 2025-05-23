import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.TCP,
      options: { host: '0.0.0.0', port: 3002 },
    },
  );
  await app.listen();
  console.log('✅ Auth service is running on TCP port 3002');
}
bootstrap();
