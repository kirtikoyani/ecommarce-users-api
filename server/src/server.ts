import http from 'http';
import 'dotenv/config';
import { app } from "./app";
import { mongoConnet } from './Services/mongoose';

const server = http.createServer(app);

async function startServer() {
    await mongoConnet();
    server.listen(5000, () => {
        console.log(`Listening on http://localhost:${5000}`);
    });
}
startServer();