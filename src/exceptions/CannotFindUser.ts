import { HttpException, HttpStatus } from "@nestjs/common";


export class CannotFindUserException extends HttpException {
    constructor() {
        super("Cannot find user with that username", HttpStatus.BAD_REQUEST)
    }
}