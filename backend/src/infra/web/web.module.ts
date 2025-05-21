import { Module } from '@nestjs/common';
import { UsecaseModule } from 'src/usecases/usecase.module';
import { DomainExceptionFilterProvider } from './filters/domain/domain-exception.filter';
import { ValidatorDomainExceptionFilterProvider } from './filters/domain/validator-domain-exception.filter';
import { CredentialsNotValidUsecaseExceptionFilterProvider } from './filters/usecases/credentials-not-valid-usecase-exception.filter';
import { EmailAlreadyExistsUsecaseExceptionFilterProvider } from './filters/usecases/email-already-exists-usecase-exception.filter';
import { UsecaseExceptionFilterProvider } from './filters/usecases/usecase-exception.filter';
import { UserNotFoundUsecaseExceptionFilterProvider } from './filters/usecases/user-not-found-usecase-exception.filter';
import { CreateUserRoute } from './routes/user/create/create-user.route';
import { ServiceExceptionFilterProvider } from './filters/infra/services/service-exception.filter';
import { RefreshTokenNotValidServiceExceptionFilterProvider } from './filters/infra/services/refresh-token-not-valid-service-exception.filter';

@Module({
  imports: [UsecaseModule],
  controllers: [CreateUserRoute],
  providers: [
    ValidatorDomainExceptionFilterProvider,
    DomainExceptionFilterProvider,
    UsecaseExceptionFilterProvider,
    CredentialsNotValidUsecaseExceptionFilterProvider,
    EmailAlreadyExistsUsecaseExceptionFilterProvider,
    UsecaseExceptionFilterProvider,
    UserNotFoundUsecaseExceptionFilterProvider,
    ServiceExceptionFilterProvider,
    RefreshTokenNotValidServiceExceptionFilterProvider,
  ],
})
export class WebModule {}
