import { CustomError } from './CustomError';

export class Unacceptable extends CustomError {
    constructor() {
        super(406, "The data format is unacceptable.");
    }
}