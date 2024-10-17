import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Knex } from 'knex';
import { HttpStatus } from '@nestjs/common';
import { getMicroResponse } from 'src/common/responses/response-type';

@Injectable()
export class OrganizationUsersService {
  constructor(@Inject('KnexConnection') private knex: Knex) {}

  async addUserToOrganization(user_id: number, org_id: number, role_id: number) {
    const [organizationUser] = await this.knex('organization_users')
      .insert({
        user_id: user_id,
        org_id: org_id,
        role_id: role_id,
      })
      .returning('*');

    return getMicroResponse(HttpStatus.CREATED, true, 'User added to organization', organizationUser);
  }

  async getUsersForOrganization(org_id: number) {
    const users = await this.knex('organization_users')
      .where({ org_id })
      .join('users', 'organization_users.user_id', 'users.id')
      .join('roles','organization_users.role_id','roles.id')
      .join('organizations','organization_users.org_id','organizations.id')
      .select('users.id as user_id','organization_users.id as id','users.name as user_name', 'organization_users.role_id','organization_users.org_id','organizations.name as org_name','roles.role_name');

    return getMicroResponse(HttpStatus.OK, true, 'Users fetched successfully', users);
  }

  async getOrganizationUserById(id: number) {
    const user = await this.knex('organization_users')
      .where({ 'organization_users.id': id })
      .join('users', 'organization_users.user_id', 'users.id')
      .join('roles', 'organization_users.role_id', 'roles.id')
      .join('organizations', 'organization_users.org_id', 'organizations.id')
      .select(
        'users.id as user_id',
        'users.name as user_name',
        'organization_users.role_id',
        'organization_users.org_id',
        'organizations.name as org_name',
        'roles.role_name'
      )
      .first(); 

    if (!user) {
      return getMicroResponse(HttpStatus.NOT_FOUND, false, 'User not found', null);
    }

    return getMicroResponse(HttpStatus.OK, true, 'User found', user);
  }

  async updateUserRole(user_id: number, org_id: number, role_id: number) {
    const [updatedUser] = await this.knex('organization_users')
      .where({ user_id, org_id })
      .update({ role_id })
      .returning('*');

    if (!updatedUser) {
      return getMicroResponse(HttpStatus.NOT_FOUND,false,'not found',null)
    }

    return getMicroResponse(HttpStatus.OK, true, 'User role updated', updatedUser);
  }

  async removeUserFromOrganization(user_id: number, org_id: number) {
    const rowsDeleted = await this.knex('organization_users')
      .where({ user_id, org_id })
      .del();

    if (rowsDeleted === 0) {
      throw new NotFoundException('User or organization not found');
    }

    return getMicroResponse(HttpStatus.OK, true, 'User removed from organization', null);
  }
}
