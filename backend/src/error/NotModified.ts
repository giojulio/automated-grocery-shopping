import { CustomError } from './CustomError';

export class NotModified extends CustomError {
    constructor() {
        super(304, "You must make changes in order to submit changes.");
    }
}