import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateProjectDto {
  @ApiProperty({ description: 'Updated name of the project', required: false })
  @IsString()
  name?: string;
}
