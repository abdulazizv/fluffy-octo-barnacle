import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsDateString, IsEnum } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({ description: 'Task description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Task details', required: false })
  @IsOptional()
  @IsString()
  task?: string;

  @ApiProperty({ description: 'User ID of the worker assigned to the task', required: false })
  @IsOptional()
  @IsInt()
  worker_user_id?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  project_id?: number;

  @ApiProperty({ description: 'Due date of the task', example:'2024-10-18T06:52:30.862Z',required: false})
  @IsOptional()
  @IsDateString()
  due_date: string;

  @ApiProperty({ description: 'Task status', enum: ['CREATED', 'IN_PROCESS', 'DONE'], required: false })
  @IsOptional()
  @IsEnum(['CREATED', 'IN_PROCESS', 'DONE'])
  status?: string;

  @ApiProperty({required: false,example:'2024-10-18T06:52:30.862Z'})
  @IsOptional()
  @IsDateString()
  done_at: string;
}
