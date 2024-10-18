import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ description: 'Organization ID the project belongs to' })
  @IsInt()
  org_id: number;

  @ApiProperty({ description: 'Name of the project' })
  @IsString()
  name: string;
}
