import { CustomError } from './CustomError';

export class NotSatisfiable extends CustomError {
    constructor() {
        super(416, "We couldn't fulfill this request.");
    }
}