import { app } from "./app";
import { alterShoppingList } from "./endpoints/alterShoppingList";
import { createShoppingList } from "./endpoints/createShoppingList";
import { createUser } from "./endpoints/createUser";
import { deleteListItem } from "./endpoints/deleteListItem";
import { getAllProducts } from "./endpoints/getAllProducts";
import { getShoppingList } from "./endpoints/getShoppingList";
import { createLogin } from "./endpoints/createLogin";
import { deleteShoppingList } from "./endpoints/deleteShoppingList";

app.get('/products', getAllProducts);
app.get('/shp-list/:id', getShoppingList);
app.post('/login', createLogin);
app.post('/shp-list', createShoppingList);
app.post('/register', createUser);
app.delete('/shp-list', deleteShoppingList);
app.delete('/shp-list/edit', deleteListItem);
app.put('/shp-list/edit', alterShoppingList);