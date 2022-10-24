import { User } from "src/utils/typeorm/entities/User";
import { CreateUserParams } from "src/utils/types/queries";

export interface IAuthService {
    registerUser(params: CreateUserParams): Promise<User>;
    validateUser();
}