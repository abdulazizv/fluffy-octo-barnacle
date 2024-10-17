import { HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Knex } from 'knex';
import { MicroResponse } from 'src/common/interfaces/response-type.interface';
import { getMicroResponse } from 'src/common/responses/response-type';

@Injectable()
export class OrganizationsService {
  constructor(@Inject('KnexConnection') private knex: Knex) {}

  async createOrganization(name: string, createdBy: number): Promise<any> {
    const [organization] = await this.knex('organizations')
      .insert({
        name,
        created_by: createdBy,
      })
      .returning('*');

    return getMicroResponse(HttpStatus.CREATED,true,'Created',organization);
  }

  async getAllOrganizations(): Promise<MicroResponse> {
    const data = await this.knex('organizations').select('*');

    if(data.length < 1) {
        return getMicroResponse(HttpStatus.NOT_FOUND, false,'Not found',null)
    }

    return getMicroResponse(HttpStatus.OK,true,'Success',data)
  }

  async getOrganizationById(id: number): Promise<MicroResponse> {
    const organization = await this.knex('organizations').where({ id }).first();

    if (!organization) {
      return getMicroResponse(HttpStatus.NOT_FOUND,false,'Not found',null)
    }
    return getMicroResponse(HttpStatus.OK,true,'Success',organization);
  }

  async updateOrganization(id: number, name: string): Promise<MicroResponse> {
    const checkData = await this.getOrganizationById(id);
    if (!checkData.data) {
      return getMicroResponse(HttpStatus.NOT_FOUND,false,'Not found',null)
    }
    const [updatedOrganization] = await this.knex('organizations')
      .where({ id })
      .update({ name })
      .returning('*');
    

    return getMicroResponse(HttpStatus.OK,true,'Success',updatedOrganization);
  }

  async deleteOrganization(id: number): Promise<void> {
    await this.knex('organizations').where({ id }).del();
  }
}
