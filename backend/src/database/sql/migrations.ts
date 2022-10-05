import { connection } from "./connection";

const createTable = async (): Promise <void> => {
    try {
        await connection.raw(`
            CREATE TABLE IF NOT EXISTSTableName (
                id INT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                type VARCHAR(255) NOT NULL
            );
        `)

        console.log("Table successfully created.")
    } catch (error) {
        console.log("Failed to create table.")
        console.log(error.sqlMessage)
    }
};

createTable()
// .then(( )=>{populateUsersTable()})   
.finally(( )=> process.exit());