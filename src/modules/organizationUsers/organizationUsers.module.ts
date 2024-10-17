import { Module } from '@nestjs/common';
import { OrganizationUsersService } from './organizationusers.service';
import { OrganizationUsersController } from './organizationusers.controller';
import { SharedModule } from 'src/shared/shared.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SharedModule,JwtModule.register({ secret: process.env.JWT_SECRET })],
  controllers: [OrganizationUsersController],
  providers: [OrganizationUsersService],
})
export class OrganizationUsersModule {}
