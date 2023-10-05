import mongoose from "mongoose";

const MONGO_URI: string = process.env.MONGO_URI as string;
// mongoose.connection.once('opne', () => {
//     console.log("MongoDB connetion is ready!");
// });

// mongoose.connection.on('error', (err) => {
//     console.error(err);
// });
async function mongoConnet() {
    await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Database Connection is ready...");
    }).catch((err) => {
        console.log(err);
    });
}

export { mongoConnet };