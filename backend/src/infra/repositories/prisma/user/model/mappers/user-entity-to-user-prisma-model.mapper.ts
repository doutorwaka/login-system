import { User } from 'src/domain/entities/user.entity';
import UserPrismaModel from '../user.prisma.model';

export class UserEntityToUserPrismaModelMapper {
  public static map(user: User): UserPrismaModel {
    const aModel: UserPrismaModel = {
      id: user.getId(),
      email: user.getEmail(),
      password: user.getPassword(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt(),
    };

    return aModel;
  }
}
