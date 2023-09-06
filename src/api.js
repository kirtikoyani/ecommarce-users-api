const express = require("express");
require('./db/connection')
const app = express();
const port = process.env.PORT || 3000;
const User = require('./models/usersSchema')

app.use(express.json())

// Using async-await

app.post("/users", async (req, res) => {
    try {
        const user = new User(req.body)
        const createUser = await user.save();
        res.status(201).send(createUser);
    } catch (e) {
        res.status(400).send(e)
    }

});

// read the data of registered Users

app.get("/users", async (req, res) => {
    try {
        const UsersData = await User.find()
        res.status(200).send(UsersData);
    } catch (e) {
        res.status(400).send(e)
    }

});

// get individual data of Users using id

app.get("/users/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const UserData=await User.findById({_id});
        res.status(201).send(UserData);
    } catch (e) {
        res.status(500).send(e)
    }

});

// update Users by it id

app.patch("/users/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const updateUsers =await User.findByIdAndUpdate(_id, req.body,{
            new:true
        });
        res.send(updateUsers);
    } catch (e) {
        res.status(404).send(e)
    }

});

// delete Users by id

app.delete("/users/:id", async (req, res) => {
    try {
        const deleteUser=await User.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            res.status(400).send();
        }
        res.status(201).send(deleteUser);
    } catch (e) {
        res.status(500).send(e)
    }

});

app.listen(port, () => {
    console.log(`server is running on ${port} !`);
});
