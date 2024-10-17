import { HttpStatus } from '@nestjs/common';

export const getMicroResponse = <T>(
  error_code: HttpStatus | number | null = null,
  result: boolean,
  message = 'Success',
  data: T,
) => {
  return { error_code, result, message, data };
};
