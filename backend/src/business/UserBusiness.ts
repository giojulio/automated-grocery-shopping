import { UserDatabase } from '../database/UserDatabase';
import { MissingData } from '../error/MissingData';
import { LoginDTO } from '../models/LoginDTO';
import { generateString } from './services/generateString';
import { RegistrationDTO } from '../models/RegistrationDTO';
import { getAddress } from './services/getAddress';
import { User } from '../models/User';
import { Verifications } from '../verification/Verifications';
import { UserVerifications } from '../verification/UserVerification';
import { Unacceptable } from '../error/Unacceptable';
import { catchError } from './services/catchError';

const verify = new Verifications()
const verifyUser = new UserVerifications()
const userDatabase = new UserDatabase()

export class UserBusiness {
	public async createLogin(input: LoginDTO) {
		try {
			if (!input.email || !input.password) {
				throw new MissingData();
			}

			const user = await userDatabase.getByEmail(input.email);

			verify.verifyExistence(user)

			const checkPwd = user[0].password === input.password;

			verifyUser.verifyPwd(checkPwd)

			const user_id = user[0].id;

			const token = generateString();

			return { token, user_id };
		} catch (error: any) {
			catchError(error)
		}
	}

	createUser = async (input: RegistrationDTO) => {
		try {
			if (input.zipcode.includes('-') || input.zipcode.length > 8) {
				throw new Unacceptable()
			}

			const address = await getAddress(input.zipcode);
			
			if (
				!input.name ||
				!input.zipcode ||
				!address.street ||
				!address.neighborhood ||
				!address.city ||
				!address.state ||
				!input.day ||
				!input.email ||
				!input.password
			) {
				throw new MissingData();
			}

			const email = await userDatabase.getByEmail(
				input.email
			);

			verify.verifyDoubleEntry(email)

			const newUser = new User(
				generateString(),
				input.name,
				input.zipcode,
				input.number ? input.number : 0,
				address.street,
				input.complement ? input.complement : 'N/A',
				address.neighborhood,
				address.city,
				address.state,
				input.day,
				input.email,
				input.password
			);

			await userDatabase.setNewObject(newUser);
			
			return newUser
		} catch (error: any) {
			catchError(error)
		}
	};

	public async getUser(id: string) {
		try {
			if (!id) {
				throw new MissingData();
			}

			const user = await userDatabase.getById(id);

			verify.verifyExistence(user)

			return user[0]
		} catch (error: any) {
			catchError(error)
		}
	}
}
