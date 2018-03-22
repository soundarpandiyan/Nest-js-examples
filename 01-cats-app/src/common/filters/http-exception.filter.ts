import { ExceptionFilter, Catch } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { stat } from 'fs';

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
  catch(exception, response) {
    if (exception.message && exception.status) {
      console.log(`Exception thrown... Status: ${exception.message.statusCode},  Message: ${exception.message.message}, Error: ${exception.message.error}`);

      if (exception.message.statusCode == 404)
        response.json({
          statusCode: exception.message.statusCode,
          message: exception.message.message,
          error: 'corresponding api url is not found. Please contact Scientific Games helpline',
        });
      else
        response.json({
          statusCode: exception.message.statusCode,
          message: exception.message.message,
          error: exception.message.error,
        });
    }

    return response;
  }
}
