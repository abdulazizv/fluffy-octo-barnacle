import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsOptional, IsDateString, IsEnum } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ description: 'ID of the project the task belongs to',required: false})
  @IsOptional()
  @IsInt()
  project_id: number;

  @ApiProperty({ description: 'Task description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Task details', required: false })
  @IsString()
  @IsOptional()
  task?: string;

  @ApiProperty({ description: 'User ID of the worker assigned to the task',required: false})
  @IsOptional()
  @IsInt()
  worker_user_id?: number;

  @ApiProperty({ description: 'Due date of the task', example:'2024-10-18T06:52:30.862Z',required: false})
  @IsOptional()
  @IsDateString()
  due_date: string;

  @ApiProperty({ description: 'Task status', enum: ['CREATED', 'IN_PROCESS', 'DONE'], default: 'CREATED' })
  @IsEnum(['CREATED', 'IN_PROCESS', 'DONE'])
  status: string;
}
