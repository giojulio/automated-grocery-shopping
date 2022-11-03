import { CustomError } from './CustomError';

export class Unauthorized extends CustomError {
    constructor() {
        super(401, 'Your request was not authorized. Review and try again.');
    }
}