import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { JwtAuthGuard } from 'src/common/custom/guards/jwt-auth.guard';
import { CreateOrganizationDto } from './dto/create-organizations.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MicroResponse } from 'src/common/interfaces/response-type.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';

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

  @Get()
  async getAllOrganizations(@Query() params: PaginationDto): Promise<MicroResponse> {
    return this.organizationsService.getAllOrganizations(+params.page,+params.size);
  }

  @Get(':id')
  async getOrganizationById(@Param('id') id: number): Promise<any> {
    return this.organizationsService.getOrganizationById(id);
  }

  @Patch(':id')
  async updateOrganization(@Param('id') id: number, @Body() params: CreateOrganizationDto): Promise<any> {
    return this.organizationsService.updateOrganization(id, params.name);
  }

  @Delete(':id')
  async deleteOrganization(@Param('id') id: number): Promise<void> {
    return this.organizationsService.deleteOrganization(id);
  }
}
