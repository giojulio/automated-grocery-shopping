import { connection } from "./connection";
import { products } from "./data";

const createTables = async (): Promise<void> => {
    try {
        await connection.raw(`
            CREATE TABLE IF NOT EXISTS Shp_Products (
                id INT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price DECIMAL(4,2) NOT NULL,
                stock_qty INT
            );

            CREATE TABLE IF NOT EXISTS Shp_Users (
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                zipcode VARCHAR(8) NOT NULL,
                number INT,
                street VARCHAR(255) NOT NULL,
                complement VARCHAR(255),
                neighborhood VARCHAR(255) NOT NULL,
                city VARCHAR(255) NOT NULL,
                state VARCHAR(2) NOT NULL,
                delivery_date INT,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(50) NOT NULL
            );

            CREATE TABLE IF NOT EXISTS Shp_Orders (
                id VARCHAR(255) PRIMARY KEY,
                user_id VARCHAR(255) NOT NULL,
                product_id INT NOT NULL,
                desired_qty INT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES Shp_Users(id),
                FOREIGN KEY (product_id) REFERENCES Shp_Products(id)
            );
        `)
    } catch (error: any) {
        printError(error)
    }
};

const populateTables = async (): Promise<void> => {
    try {
        await connection("Shp_Products")
            .insert(products)
            .then(() => console.log(`Shp tables created & Shp_Products populated!`))
            .catch((error: any) => printError(error));

    } catch (error) {
        printError(error)
    };
};

const printError = (error: any) => {
    console.log(error.sqlMessage || error.message)
};


createTables()
    .then(() => populateTables())
    .finally(() => process.exit());