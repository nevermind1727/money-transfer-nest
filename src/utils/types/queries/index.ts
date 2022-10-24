export type FindUserParams = Partial<{
    id: number;
    username: string;
}>

export type CreateUserParams = {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
}