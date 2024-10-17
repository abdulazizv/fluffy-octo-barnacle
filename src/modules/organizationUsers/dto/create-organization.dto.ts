import { IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddUserToOrganizationDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsInt()
  user_id: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsInt()
  org_id: number;

  @ApiProperty({ example: 2 })
  @IsNotEmpty()
  @IsInt()
  role_id: number;
}
