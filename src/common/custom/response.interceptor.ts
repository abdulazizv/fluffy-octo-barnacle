import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    HttpStatus,
  } from '@nestjs/common';
  import { Observable, of } from 'rxjs';
  import { catchError, map } from 'rxjs/operators';
  import { MicroResponse } from '../interfaces/response-type.interface';
  
  @Injectable()
  export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const res = context.switchToHttp().getResponse();
      const req = context.switchToHttp().getRequest();
      return next.handle().pipe(
        map((data) => {
          if (data == undefined) {
            return data;
          }
          const response: MicroResponse = {
            error_code: data?.error_code || null,
            result: data?.result ?? true,
            message: data?.message || 'Success',
            data: data?.data || null,
          };
          res.status(data.error_code || HttpStatus.OK);
          return response;
        }),
        catchError((error: any) => {
          console.log(error);
          const error_message =
            Object.values(error?.response?.errors)[0] || 'Internal Server Error';
          const response = {
            error_code:
              error.error_code ||
              error.response.status ||
              HttpStatus.INTERNAL_SERVER_ERROR,
            result: false,
            message: error_message,
            data: null,
          };
          res.status(
            error.error_code ||
              error.response.status ||
              HttpStatus.INTERNAL_SERVER_ERROR,
          ); 
          return of(response);
        }),
      );
    }
  
    private isStream(data: any): boolean {
      return data && typeof data.pipe === 'function';
    }
  }
  