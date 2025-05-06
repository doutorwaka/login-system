import { UserGateway } from 'src/domain/repositories/user.gateway';
import { UserNotFoundUsecaseException } from 'src/usecases/exceptions/user-not-found.usecase.exception';
import { Usecase } from 'src/usecases/usecase';

export type FindUserInput = {
  id: string;
};

export type FindUserOutput = {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export class FindUserUsecase implements Usecase<FindUserInput, FindUserOutput> {
  public constructor(private readonly userGateway: UserGateway) {}

  public async execute({ id }: FindUserInput): Promise<FindUserOutput> {
    const anUser = await this.userGateway.findById(id);

    if (!anUser) {
      throw new UserNotFoundUsecaseException(
        `User not found while finding user with id ${id} in ${FindUserUsecase.name}`,
        `Usuário não encontrado`,
        FindUserUsecase.name,
      );
    }

    const output: FindUserOutput = {
      id: anUser.getId(),
      email: anUser.getEmail(),
      createdAt: anUser.getCreatedAt(),
      updatedAt: anUser.getUpdatedAt(),
    };

    return output;
  }
}
