import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { JwtAuthGuard } from 'src/common/custom/guards/jwt-auth.guard';
import { CreateOrganizationDto } from './dto/create-organizations.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MicroResponse } from 'src/common/interfaces/response-type.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { StaffGuardAuth } from 'src/common/custom/guards/auth-guard.staff';

@ApiBearerAuth()
@ApiTags('Organizations')
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOrganization(@Body() params: CreateOrganizationDto, @Req() req): Promise<any> {
    const createdBy = req.user.id;
    return this.organizationsService.createOrganization(params.name, createdBy);
  }

  @UseGuards(StaffGuardAuth)
  @Get()
  async getAllOrganizations(@Query() params: PaginationDto): Promise<MicroResponse> {
    return this.organizationsService.getAllOrganizations(+params.page,+params.size);
  }

  @UseGuards(StaffGuardAuth)
  @Get(':id')
  async getOrganizationById(@Param('id') id: number): Promise<any> {
    return this.organizationsService.getOrganizationById(id);
  }

  @UseGuards(StaffGuardAuth)
  @Patch(':id')
  async updateOrganization(@Param('id') id: number, @Body() params: CreateOrganizationDto): Promise<any> {
    return this.organizationsService.updateOrganization(id, params.name);
  }

  @UseGuards(StaffGuardAuth)
  @Delete(':id')
  async deleteOrganization(@Param('id') id: number): Promise<void> {
    return this.organizationsService.deleteOrganization(id);
  }
}
