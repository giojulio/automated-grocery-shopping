import { CustomError } from './CustomError';

export class MissingData extends CustomError {
    constructor() {
        super(417, 'You must provide data for this request.');
    }
}