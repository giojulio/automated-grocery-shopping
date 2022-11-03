import { CustomError } from "../../error/CustomError";

export const catchError = (error: any) => {
    throw new CustomError(
        error.statusCode,
        error.message || error.sqlMessage
    );
}