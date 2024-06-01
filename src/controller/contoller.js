import asyncHandler from '../utils/asyncHandler.js'
import { User } from '../models/user.model.js';

const registerUser = asyncHandler(async (req, res) => {
    try {
        const { firstName, lastName, email, mobile, street, city, state, country, login_ID, password} = req.body;
        if (!email || !password) {
            throw new Error(console.error("All required feild required", error))
        }
        const existUser = await User.findOne({ email })
        if (existUser) {
            return res.status(200).json("User Already Exits !")
        }
        else {
            let addressInfo = undefined;

            if (city && city.trim() !== "" && state && state.trim() !== "" && country && country.trim() !== "") {
                addressInfo = {
                    street,
                    city,
                    state,
                    country
                }
            }

            const user = await User.create({
                first_name: firstName,
                last_name: lastName,
                mobile_number: mobile,
                email: email,
                address: addressInfo,
                login_id: login_ID,
                password: password,
            })

            return res.status(201).json("User register successfully.")
        }


    } catch (error) {
        const errors = {};
        Object.keys(error.errors).forEach(key => {
            errors[key] = error.errors[key].message;
        });
        res.status(400).json({ errors });
    }
})


export default registerUser;