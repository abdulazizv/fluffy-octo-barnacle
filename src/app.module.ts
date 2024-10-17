import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './modules/users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/custom/response.interceptor';
import { JwtModule } from '@nestjs/jwt';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { OrganizationUsersModule } from './modules/organizationUsers/organizationUsers.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SharedModule,
    UsersModule,
    OrganizationsModule,
    OrganizationUsersModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
