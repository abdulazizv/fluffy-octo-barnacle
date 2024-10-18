import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { getMicroResponse } from 'src/common/responses/response-type'; 
import { CreateProjectDto } from './dto/create-project.dto';
import { Knex } from 'knex';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(@Inject('KnexConnection') private knex: Knex) {}

  private async checkOrgId(org_id: number) {
    const organization = await this.knex('organizations').where({ id: org_id }).first()

    return organization;
  }

  async create(projectDto: CreateProjectDto, user_id: number) {
    const checkOrgId = await this.checkOrgId(projectDto.org_id);
    
    if(!checkOrgId) {
        return getMicroResponse(HttpStatus.BAD_REQUEST,false,'Org id incorrect',null)
    }

    const project = await this.knex('projects').insert({
      ...projectDto,
      created_by: user_id,
    }).returning('*');

    return getMicroResponse(HttpStatus.CREATED, true, 'Project created successfully', project);
  }

  async findAll() {
    const projects = await this.knex('projects')
        .join('organizations','projects.org_id','organizations.id')
        .join('users', 'projects.created_by', 'users.id')
        .select('projects.id','projects.org_id','projects.created_by','projects.name as project_name','projects.created_at','organizations.name as organization_name','users.name as user_name')

    if (projects.length < 1) {
        return getMicroResponse(HttpStatus.NOT_FOUND, false,'Not found',null)
    }

    return getMicroResponse(HttpStatus.OK, true, 'Projects fetched successfully', projects);
  }

  async findOne(id: number) {
    const project = await this.knex('projects')
        .where({ 'projects.id': id })
        .join('organizations','projects.org_id','organizations.id')
        .join('users', 'projects.created_by', 'users.id')
        .select('projects.id','projects.org_id','projects.created_by','projects.name as project_name','projects.created_at','organizations.name as organization_name','users.name as user_name')
        .first();

    if (!project) {
      return getMicroResponse(HttpStatus.NOT_FOUND, false, 'Project not found', null);
    }
    return getMicroResponse(HttpStatus.OK, true, 'Project fetched successfully', project);
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const checkData = await this.findOne(id);

    if(!checkData.data) {
        return getMicroResponse(HttpStatus.NOT_FOUND, false, 'Project not found', null);
    }

    const updatedProject = await this.knex('projects').where({ id }).update({
      ...updateProjectDto,
    }).returning('*');

    return getMicroResponse(HttpStatus.OK, true, 'Project updated successfully', updatedProject);
  }

  async remove(id: number) {
    await this.knex('projects').where({ id }).del();
    return getMicroResponse(HttpStatus.OK, true, 'Project deleted successfully', null);
  }
}
