import { Module } from '@nestjs/common';
import { CreateUserRoute } from './routes/user/create/create-user.route';
import { UsecaseModule } from 'src/usecases/usecase.module';
import { ValidatorDomainExceptionFilterProvider } from './filters/validator-domain-exception.filter';

@Module({
  imports: [UsecaseModule],
  controllers: [CreateUserRoute],
  providers: [ValidatorDomainExceptionFilterProvider],
})
export class WebModule {}
