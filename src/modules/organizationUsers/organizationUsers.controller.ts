import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards, HttpStatus, Query } from '@nestjs/common';
import { OrganizationUsersService } from './organizationusers.service';
import { AddUserToOrganizationDto } from './dto/create-organization.dto';
import { UpdateUserRoleDto } from './dto/update-organization.dto';
import { JwtAuthGuard } from 'src/common/custom/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { StaffGuardAuth } from 'src/common/custom/guards/auth-guard.staff';

@ApiTags('Organization Users')
@ApiBearerAuth()
@Controller('organization-users')
@UseGuards(JwtAuthGuard)
export class OrganizationUsersController {
  constructor(private readonly organizationUsersService: OrganizationUsersService) {}

  @UseGuards(StaffGuardAuth)
  @ApiOperation({ summary: 'Add a user to an organization with a role' })
  @Post('add')
  async addUserToOrganization(@Body() addUserToOrganizationDto: AddUserToOrganizationDto) {
    const { user_id, org_id, role_id } = addUserToOrganizationDto;
    return this.organizationUsersService.addUserToOrganization( user_id, org_id, role_id);
  }

  @UseGuards(StaffGuardAuth)
  @ApiOperation({ summary: 'Get all users for a specific organization' })
  @Get(':org_id')
  async getUsersForOrganization(@Param('org_id') orgId: number,@Query() params: PaginationDto) {
    return this.organizationUsersService.getUsersForOrganization(orgId,+params.page,+params.size);
  }

  @UseGuards(StaffGuardAuth)
  @ApiOperation({ summary: 'Update a user\'s role in an organization' })
  @Patch('update')
  async updateUserRole(@Body() updateUserRoleDto: AddUserToOrganizationDto) {
    const { user_id, org_id, role_id } = updateUserRoleDto;
    return this.organizationUsersService.updateUserRole(user_id, org_id, role_id);
  }

  @UseGuards(StaffGuardAuth)
  @ApiOperation({ summary: 'Remove a user from an organization' })
  @Delete('remove/:user_id/:org_id')
  async removeUserFromOrganization(@Param('user_id') user_id: number, @Param('org_id') org_id: number) {
    return this.organizationUsersService.removeUserFromOrganization(user_id, org_id);
  }

  @UseGuards(StaffGuardAuth)
  @Get('get-by/:id')
  @ApiOperation({ summary: 'Get organization user by ID' })
  @ApiParam({ name: 'id', description: 'Organization User ID', type: Number })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The organization user has been successfully retrieved.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Organization user not found.',
  })
  async getOrganizationUserById(@Param('id') id: number) {
    return this.organizationUsersService.getOrganizationUserById(id);
  }
}
