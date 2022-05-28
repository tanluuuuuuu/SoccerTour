import jwt from "jsonwebtoken";
import { userModel } from "../models/tourModel.js";

export const UserProtection = async (req, res, next) => {
    try {
        let token;

        if (
            req.body.header['Authorization'] &&
            req.body.header['Authorization'].startsWith("Bearer")
        ) {
            // Bearer 123gh12j3gj12g3jh
            token = req.body.header['Authorization'].split(" ")[1];
        }

        if (!token) {
            console.log("Not authorized");
            return res.status(401).send("Not authorized");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id);

        if (!user) {
            console.log("No user found with this id");
            return res.status(401).send("No user found with this id");
        }

        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).send(error.message);
    }
};

export const AdminProtection = async (req, res, next) => {
    try {
        let token;
        if (
            req.body.header['Authorization'] &&
            req.body.header['Authorization'].startsWith("Bearer")
        ) {
            // Bearer 123gh12j3gj12g3jh
            token = req.body.header['Authorization'].split(" ")[1];
        }

        if (!token) {
            console.log("Not authorized");
            return res.status(401).send("Not authorized");
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id);

        if (!user) {
            console.log("No user found with this id");
            return res.status(401).send("No user found with this id");
        } else if (user.role != "admin") {
            console.log("Only admin can access this data");
            return res.status(401).send("Only admin can access this data");
        }

        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).send(error.message);
    }
};
