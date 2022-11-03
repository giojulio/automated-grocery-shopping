import { CustomError } from './CustomError';

export class NotFound extends CustomError {
    constructor() {
        super(404, "We couldn't find matching data for this request.");
    }
}