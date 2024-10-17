import { HttpStatus } from '@nestjs/common';

export interface MicroResponse {
  error_code: HttpStatus | null;
  result: boolean;
  message: string;
  data: any;
}
