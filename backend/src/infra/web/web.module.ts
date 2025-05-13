import { Module } from '@nestjs/common';
import { CreateUserRoute } from './routes/user/create/create-user.route';
import { UsecaseModule } from 'src/usecases/usecase.module';

@Module({
  imports: [UsecaseModule],
  controllers: [CreateUserRoute],
})
export class WebModule {}
