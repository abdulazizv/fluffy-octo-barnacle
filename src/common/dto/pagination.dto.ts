import { ApiProperty } from "@nestjs/swagger";
import { IsPagination } from "../validators/custom-pagination.dto";

export class PaginationDto {
    @ApiProperty({
      default: 1,
    })
    @IsPagination()
    page: string;
  
    @ApiProperty({
      default: 10,
    })
    @IsPagination()
    size: string;
  }