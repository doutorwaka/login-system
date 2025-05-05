import { Utils } from 'src/shared/utils/utils';
import { Entity } from '../shared/entities/entity';
import { UserValidatorFactory } from '../factories/user.validator.factory';
import { UserPasswordValidatorFactory } from '../factories/user-password.validator.factory';

export type UserCreateDto = {
  email: string;
  password: string;
};

export class User extends Entity {
  private constructor(
    id: string,
    private email: string,
    private password: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(id, createdAt, updatedAt);
    this.validate();
  }

  public static create({ email, password }: UserCreateDto): User {
    const id = Utils.generateUUID();

    UserPasswordValidatorFactory.create().validate(password);

    const hashedPassword = Utils.encryptPassword(password);
    const createdAt = new Date();
    const updatedAt = new Date();
    return new User(id, email, hashedPassword, createdAt, updatedAt);
  }

  protected validate(): void {
    UserValidatorFactory.create().validate(this);
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public comparePassword(aPassword: string): boolean {
    return Utils.comparePassword(aPassword, this.password);
  }
}
