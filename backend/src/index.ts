import { app } from "./app";
import { productRouter } from "./controller/router/ProductRouter";
import { shoppingListRouter } from "./controller/router/ShoppingListRouter";
import { userRouter } from "./controller/router/UserRouter";

app.use('/', userRouter);
app.use('/products', productRouter);
app.use('/shp-list', shoppingListRouter);