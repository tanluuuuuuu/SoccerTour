import { userModel, teamModel } from "../models/tourModel.js";
import _ from "lodash";
import jwt from "jsonwebtoken";

export const getUserList = async (req, res) => {
    try {
        const allUser = await userModel.find();
        _.remove(allUser, (user) => {
            return user._id.equals(req.user._id);
        });
        res.status(200).json(allUser);
    } catch (error) {
        console.log(error.message);
        res.status(400).send(error.message);
    }
};

export const checksignin = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            console.log("Empty token");
            return res.status(401).send("Empty token");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id);

        if (!user) {
            console.log("No user found with this id");
            return res.status(401).send("No user found with this id");
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const signin = async (req, res) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        return res.status(400).send("Please provide username and password");
    }

    try {
        let user = await userModel
            .findOne({ username: userName })
            .select("+password");

        if (!user) {
            console.log("Người dùng không tồn tại");
            return res.status(401).send("Người dùng không tồn tại");
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            console.log("Invalid Credential");
            return res.status(401).send("Invalid Credential");
        }

        const token = user.getSignedToken();

        user = user.toObject();
        _.set(user, "token", token);
        _.unset(user, "password");

        res.status(200).json(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const signup = async (req, res, next) => {
    try {
        const { phoneNumber, country, userName, password } = req.body;

        if (userModel.find({ username: userName })) {
            console.log("User already exist");
            return res.status(409).send("User already exist");
        }

        const registeredUser = await userModel.create({
            phoneNumber,
            username: userName,
            country,
            password,
        });

        const token = registeredUser.getSignedToken();
        registeredUser.token = token;
        delete registeredUser["password"];

        res.status(200).json(registeredUser);
    } catch (error) {
        console.log(error);
        res.status(409).json({ message: error });
    }
};

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json(token);
};
