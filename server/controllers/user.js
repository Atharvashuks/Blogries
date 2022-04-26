import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email: email });

        if (!existingUser) {
            res.status(404).json({ message: `user dosen't exist...` });
        }

        const isPassword = await bcrypt.compare(password, existingUser.password);

        if (!isPassword) {
            res.status(400).json({ message: `Invalid credentials` });
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'Atharva', {expiresIn: "1h"});

        res.status(200).json({result: existingUser, token});
    } catch (error) {
        res.status(500).json({message: 'Wrong !!!!'});
    }
};
export const signup = async (req, res) => {
    const {firstName, email, password, lastName, confirmPassword} = req.body;

    try {
        const existingUser = await User.findOne({email: email});

        if(existingUser){
            return res.status(404).json({message: `User already exist!!!` });
        }

        if(password !== confirmPassword){
            return res.status(400).json({message: `Passwords not match!!!`});
        }

        const hashPassword = await bcrypt.hash(password, 14);

        const result = await User.create({email,password: hashPassword, name:`${firstName} ${lastName}`});

        const token = jwt.sign({email: result.email , id: result._id}, 'Atharva' , {expiresIn: '1h'});

        res.status(200).json({result, token});
    } catch (error) {
        res.status(500).json({message: `Error!!!`});
    }
};