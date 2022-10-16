import express from "express";
import cors from "cors";
import { AddressInfo } from "net";

export const app = express();

app.use(express.json());
app.use(cors());


const server = app.listen(process.env.PORT || 3306, () => {
	if (server) {
		const address = server.address() as AddressInfo;

		console.log(`Server is running in https://52.67.231.102:${address.port}`);
	} else {
		console.error(`Failure upon starting server.`);
	}
});
