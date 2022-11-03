import { Unauthorized } from "../error/Unauthorized";

export class UserVerifications {
    public verifyPwd (input: boolean) {
        if (input === false) {
            throw new Unauthorized();
        }
    }
}