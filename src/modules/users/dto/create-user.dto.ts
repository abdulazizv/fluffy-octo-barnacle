import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  role_id?: number;

  @IsOptional()
  @IsString()
  login?: string;

  @IsOptional()
  @IsString()
  token?: string;
}
