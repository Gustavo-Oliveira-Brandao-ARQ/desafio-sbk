import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

interface ExceptionResponse {
  code?: string;
  message?: string | string[];
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as
      | ExceptionResponse
      | string;

    let code = 'ERROR';
    let message = exception.message;

    if (typeof exceptionResponse === 'object') {
      if (exceptionResponse.code) {
        code = exceptionResponse.code;
      }
      if (exceptionResponse.message) {
        message = Array.isArray(exceptionResponse.message)
          ? exceptionResponse.message.join(', ')
          : exceptionResponse.message;
      }
    }

    response.status(status).json({
      code,
      message,
    });
  }
}
