import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Knex } from 'knex';
import { getMicroResponse } from 'src/common/responses/response-type';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';

@Injectable()
export class TasksService {
  constructor(@Inject('KnexConnection') private knex: Knex) {}

  async createTask(createTaskDto: CreateTaskDto, user_id: number) {
    const { project_id, worker_user_id } = createTaskDto;

    if(project_id) {
        const projectExists = await this.knex('projects').where({ id: project_id }).first();
        if (!projectExists) {
            return getMicroResponse(HttpStatus.NOT_FOUND,false,'Project id incorrect',null)
          }
    }
    
    if(worker_user_id) {
        const workerExists = await this.knex('users').where({ id: worker_user_id }).first();

        if (!workerExists) {
            return getMicroResponse(HttpStatus.NOT_FOUND,false,'Worker id incorrect',null)
        }
    }
    
    const [task] = await this.knex('tasks')
      .insert({
        ...createTaskDto,
        created_by: user_id,
        created_at: this.knex.fn.now(),
      })
      .returning('*');

    return getMicroResponse(null, true, 'Task created successfully', task);
  }

  async filterTasks(params: FilterTaskDto) {
    const offset = (+params.page - 1) * +params.size;

    const tasks = await this.knex('tasks')
        .where(params)
        .join('users', 'tasks.worker_user_id', 'users.id')
        .join('projects','tasks.project_id','projects.id')
        .select('tasks.id as task_id', 'users.name as worker_name','tasks.created_by','tasks.description','tasks.task','tasks.project_id','tasks.due_date','tasks.worker_user_id','tasks.status','tasks.done_at','projects.name as project_name')
        .limit(+params.size)
        .offset(offset)

    return getMicroResponse(null, true, 'Tasks fetched successfully', tasks);
  }
  async getAllTasksByProject(projectId: number,page:number,size:number) {
    const offset = (page - 1) * size;
    const tasks = await this.knex('tasks')
      .where({ project_id: projectId })
      .join('users', 'tasks.worker_user_id', 'users.id')
      .join('projects','tasks.project_id','projects.id')
      .select('tasks.id', 'users.name as worker_name','tasks.created_by','tasks.description','tasks.task','tasks.project_id','tasks.due_date','tasks.worker_user_id','tasks.status','tasks.done_at','projects.name as project_name')
      .limit(size)
      .offset(offset)

    return getMicroResponse(null, true, 'Tasks fetched successfully', tasks);
  }

  async getTaskById(id: number) {
    const task = await this.knex('tasks')
      .where({ 'tasks.id': id })
      .leftJoin('users', 'tasks.worker_user_id', 'users.id')
      .leftJoin('projects','tasks.project_id','projects.id')
      .select('tasks.id as task_id', 'users.name as worker_name','tasks.created_by','tasks.description','tasks.task','tasks.project_id','tasks.due_date','tasks.worker_user_id','tasks.status','tasks.done_at','projects.name as project_name')
      .first();

    if (!task) {
      return getMicroResponse(HttpStatus.NOT_FOUND,false,'Success',null)
    }

    return getMicroResponse(null, true, 'Task fetched successfully', task);
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.knex('tasks').where({ id }).first();

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if(updateTaskDto.project_id) {
        const projectExists = await this.knex('projects').where({ id: updateTaskDto.project_id }).first();
        if (!projectExists) {
            return getMicroResponse(HttpStatus.NOT_FOUND,false,'Project id incorrect',null)
          }
    }
    const updatedTask = await this.knex('tasks').where({ id }).update(updateTaskDto).returning('*');

    return getMicroResponse(null, true, 'Task updated successfully', updatedTask[0]);
  }

  async deleteTask(id: number) {
    const task = await this.knex('tasks').where({ id }).first();

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    await this.knex('tasks').where({ id }).del();

    return getMicroResponse(null, true, 'Task deleted successfully', null);
  }

  async finishTask(task_id: number) {
    const task = await this.knex('tasks').where({ id: task_id }).first();

    if (!task) {
      return getMicroResponse(HttpStatus.NOT_FOUND,false,'not found',null)
    }

    const updatedTask = await this.knex('tasks').where({ id:task_id }).update(
        {
            done_at: this.knex.fn.now(),
            status: 'DONE'
        }
    ).returning('*');
    
    return getMicroResponse(null, true, 'Task updated successfully', updatedTask[0]);
  }

  async getTasksByStatus(worker_user_id: number) {
    const tasksByStatus = await this.knex('tasks')
      .where({ worker_user_id: worker_user_id })
      .select('status', this.knex.raw('count(*) as count'))
      .groupBy('status');

    return getMicroResponse(null, true, 'Tasks grouped by status fetched successfully', tasksByStatus);
  }

  async getTasksByProject(worker_user_id: number) {
    const tasksByProject = await this.knex('tasks')
      .where({ worker_user_id: worker_user_id })
      .join('projects', 'tasks.project_id', 'projects.id')
      .select(
        'tasks.id as task_id',
        'tasks.project_id',
        'projects.name as project_name',
        'tasks.task',
        'tasks.status',
        'tasks.due_date',
        'tasks.done_at'
      );

    return getMicroResponse(null, true, 'Tasks grouped by project fetched successfully', tasksByProject);
  }
}
