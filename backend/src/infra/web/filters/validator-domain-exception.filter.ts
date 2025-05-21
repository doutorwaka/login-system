import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { Response } from 'express';
import { ValidatorDomainException } from 'src/domain/shared/exceptions/validator-domain.exception';

@Catch(ValidatorDomainException)
export class ValidatorDomainExceptionFilter implements ExceptionFilter {
  public catch(exception: ValidatorDomainException, host: ArgumentsHost) {
    const logger = new Logger(exception.getContext());

    logger.error(exception.getInternalMessage());
    logger.error(exception.stack);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = HttpStatus.BAD_REQUEST;
    const message = exception.getExternalMessage();

    const aResponseData = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: message,
    };

    response.status(status).json(aResponseData);
  }
}

export const ValidatorDomainExceptionFilterProvider = {
  provide: APP_FILTER,
  useClass: ValidatorDomainExceptionFilter,
};
