import { RequestHandler } from "express";
const User = require("../../Db/usersSchema");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your-secret-key'; // Replace with a secure secret key

export const getAllUser: RequestHandler = async (req, res, next) => {
    try {
        const usersData = await User.find()
        res.status(200).json(usersData);
    } catch (e:any) {
        res.status(400).json({ error: e.message });
    }
};

export const getUserById: RequestHandler = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const userData = await User.findById(_id);
        if (!userData) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(userData);
    } catch (e:any) {
        res.status(500).json({ error: e.message });
    }
};

export const postUser: RequestHandler = async (req, res, next) => {
    try {
        const { name, email, password, phone, address, country, businessCategory,role } = req.body;

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            name,
            email,
            password: hashedPassword, 
            phone,
            address,
            country,
            businessCategory,
            role
        });

        const createUser = await user.save();
        res.status(201).json(createUser);
    } catch (e:any) {
        res.status(400).json({ error: e.message });
    }
};


export const loginUser: RequestHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if the email and password match (you need to implement this logic)
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (e:any) {
        res.status(400).json({ error: e.message });
    }
};

export const putUser: RequestHandler = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const updateUsers = await User.findByIdAndUpdate(_id, req.body, {
            new: true
        });

        if (!updateUsers) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(updateUsers);
    } catch (e:any) {
        res.status(500).json({ error: e.message });
    }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const deleteUser = await User.findByIdAndDelete(_id);

        if (!deleteUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(204).send(); // No content on successful deletion
    } catch (e:any) {
        res.status(500).json({ error: e.message });
    }
};

// Authentication middleware
export const authenticateUser: RequestHandler = async (req, res, next) => {
    try {
        // Get the token from the request header
        const token = req.header('Authorization');
        console.log(token)

        if (!token) {
            return res.status(401).json({ error: 'Authentication failed' });
        }

        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded)
        // req.user = decoded; // Add the user to the request object

        next();
    } catch (e) {
        res.status(401).json({ error: 'Authentication failed' });
    }
};
