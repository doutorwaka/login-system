import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { Response } from 'express';
import { ExceptionUtils } from 'src/shared/utils/exception-utils';
import { LogUtils } from 'src/shared/utils/log-utils';
import { CredentialsNotValidUsecaseException } from 'src/usecases/exceptions/credentials-not-valid.usecase.exception';

@Catch(CredentialsNotValidUsecaseException)
export class CredentialsNotValidUsecaseExceptionFilter
  implements ExceptionFilter
{
  public catch(
    exception: CredentialsNotValidUsecaseException,
    host: ArgumentsHost,
  ) {
    LogUtils.logException(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = HttpStatus.BAD_REQUEST;

    const aResponseData = ExceptionUtils.buildErrorResponse(exception, status);

    response.status(status).json(aResponseData);
  }
}

export const CredentialsNotValidUsecaseExceptionFilterProvider = {
  provide: APP_FILTER,
  useClass: CredentialsNotValidUsecaseExceptionFilter,
};
