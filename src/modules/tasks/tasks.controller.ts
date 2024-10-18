import { Controller, Post, Body, Param, Get, Put, Delete, UseGuards, Req, Query, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/common/custom/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { FilterTaskDto } from './dto/filter-task.dto';

@ApiTags('Tasks')
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto, @Req() req) {
    const user_id = req.user.id
    return this.tasksService.createTask(createTaskDto, user_id);
  }

  @Get(':id')
  async getTaskById(@Param('id') id: number) {
    return this.tasksService.getTaskById(id);
  }

  @Get('filter')
  async filterTasks(@Query() params: FilterTaskDto){
    return this.tasksService.filterTasks(params)
  }

  @Get('project/:projectId')
  async getAllTasksByProject(@Param('projectId') projectId: number,@Query() params: PaginationDto) {
    return this.tasksService.getAllTasksByProject(projectId,+params.page,+params.size);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('worker_user/:worker_user_id/projects')
  @ApiOperation({ summary: 'Get tasks assigned to an worker_user grouped by projects' })
  @ApiResponse({ status: 200, description: 'Tasks fetched successfully' })
  async getTasksByProject(@Param('worker_user_id') worker_user_id: number) {
    return this.tasksService.getTasksByProject(worker_user_id);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('worker_user/:worker_user_id/statuses')
  @ApiOperation({ summary: 'Get tasks assigned to an worker_user grouped by status' })
  @ApiResponse({ status: 200, description: 'Tasks fetched successfully' })
  async getTasksByStatus(@Param('worker_user_id') employee_id: number) {
    return this.tasksService.getTasksByStatus(employee_id);
  }


  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateTask(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.updateTask(id, updateTaskDto);
  }


  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch('finish/:task_id') 
  @ApiOperation({ summary: 'Finish a task' })
  @ApiResponse({ status: 200, description: 'Task finished successfully.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  async finishTask(@Param('task_id') task_id: number) {
    return this.tasksService.finishTask(task_id);
  }


  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTask(@Param('id') id: number) {
    return this.tasksService.deleteTask(id);
  }
}
