import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
    .setTitle("Test Project Swagger")
    .setVersion("1.0")
    .addBearerAuth()
    .build()