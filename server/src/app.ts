import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { userRouter } from "./Controller/user/user.routes";

const app = express();

//Middleware
app.use(cors({ origin: "*" }));
app.use(morgan('tiny'));
app.use(express.json());

//routes
app.use("/api", userRouter);

export { app }; 