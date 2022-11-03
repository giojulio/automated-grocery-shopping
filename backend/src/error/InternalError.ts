import { CustomError } from './CustomError';

export class InternalError extends CustomError {
    constructor() {
        super(500, 'Server currently unavailable.');
    }
}