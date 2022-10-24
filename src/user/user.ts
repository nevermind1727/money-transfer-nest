import { User } from "src/utils/typeorm/entities/User";
import { CreateUserParams, FindUserParams } from "src/utils/types/queries";

export interface IUserService {
    createUser(params: CreateUserParams): Promise<User>;
    findUser(params: FindUserParams): Promise<User | undefined>;
}