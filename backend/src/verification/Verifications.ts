import { DuplicateEntry } from "../error/DuplicateEntry";
import { NotFound } from "../error/NotFound";
import { Unauthorized } from "../error/Unauthorized";

export class Verifications {
    public verifyExistence (input: any) {
        if (!input.length || !input) {
            throw new NotFound();
        }
    }

    public verifyDoubleEntry (input: any) {
        if (input.length) {
            throw new DuplicateEntry();
        }
    }

}