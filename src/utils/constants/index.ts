import { User } from "../typeorm/entities/User";

export enum Routes {
    AUTH = "auth",
}

export enum Services {
    AUTH = "AUTH",
    USERS = "USERS"
}

export const findUserSelectors: (keyof User)[] = ["firstName", "lastName", "username", "id", "createdAt"]

export const getUserSelectors = (selectPassword?: boolean): (keyof User)[] => selectPassword ? [...findUserSelectors, "password"] : findUserSelectors