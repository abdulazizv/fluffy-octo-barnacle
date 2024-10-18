import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/common/dto/pagination.dto";

export class FilterTaskDto extends PaginationDto {
    @ApiProperty({ required: false})
    @IsOptional()
    @IsInt()
    project_id: number;

    @ApiProperty({ required: false})
    @IsOptional()
    @IsInt()
    worker_user_id: number;

    @ApiProperty({ description: 'Task status', enum: ['CREATED', 'IN_PROCESS', 'DONE'], required: false})
    @IsEnum(['CREATED', 'IN_PROCESS', 'DONE'])
    status: string;
}