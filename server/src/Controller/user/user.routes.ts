import express from "express";
import { deleteUser, getAllUser, getUserById, postUser, putUser,authenticateUser,loginUser } from "./user.controller";
import { deleteProduct, getAllProduct, getProductById, postProduct, putProduct } from "./product.controller";

const userRouter = express.Router();

userRouter.get('/user', getAllUser);
userRouter.get('/user/:id', getUserById);
userRouter.post('/user', postUser);
userRouter.put('/user/:id', putUser);
userRouter.delete('/user/:id', deleteUser);
userRouter.post('/user/login', loginUser);

userRouter.get('/product',authenticateUser, getAllProduct);
userRouter.get('/product/:id', getProductById);
userRouter.post('/product', postProduct);
userRouter.put('/product/:id', putProduct);
userRouter.delete('/product/:id', deleteProduct);

// // Apply the middleware to specific routes
// userRouter.get('/', authenticateUser, (req:any, res) => {
//     res.json({ message: 'Protected route', user: req.user });
// });

export { userRouter };