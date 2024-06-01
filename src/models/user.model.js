import mongoose from "mongoose";

// const  validator: function(v) {
//               return typeof v === 'string' && /^[a-zA-Z\s]+$/.test(v);
//             }, = (value) => {
//     return typeof value === 'string' && value.trim().length > 0;
// };

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        // required: true,
    },
    city: {
        type: String,
        required:[ true, "City Name is required!"],
        trim: true,
        validate: {
          validator: function(v) {
              return typeof v === 'string' && /^[a-zA-Z\s]+$/.test(v);
            },
          message: 'City must be a valid string',
        },
    },
    state: {
        type: String,
        required: [true, "State name is required!"],
        trim: true,
        validate: {
          validator: function(v) {
              return typeof v === 'string' && /^[a-zA-Z\s]+$/.test(v);
            },
          message: 'State Name must be a valid string',
        },
    },
    country: {
        type: String,
        required: [true, "Country Name is required!"],
        trim: true,
        validate: {
          validator: function(v) {
              return typeof v === 'string' && /^[a-zA-Z\s]+$/.test(v);
            },
          message: 'Country Name must be a valid string',
        },
    }
})

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "First Name is required!"],
        trim: true,
        validate: {
            validator: function(v) {
              return typeof v === 'string' && /^[a-zA-Z\s]+$/.test(v);
            },
            message: 'First Name must be a valid string',
          },
    },
    last_name: {
        type: String,
        required: [true, "Last Name is required!"],
        trim: true,
        validate: {
          validator: function(v) {
              return typeof v === 'string' && /^[a-zA-Z\s]+$/.test(v);
            },
          message: 'Last Name must be a valid string',
        },
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [emailRegex, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: [true, "Password is Required"],
        minlength: [6, "Password should be at least 6 chareacter"],
        validate: {
            validator: function (v) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/.test(v);
            },
            message: props => 'Password must contain at least one uppercase letter, one lowercase letter, and one special character.',
        },
    },
    login_id: {
        type: String,
        required:[true, "Loggin Id is required"],
        trim: true,
        minlength: [8, "Login id should be at least 8 chareacter"],
        validate: {
          validator: function(v) {
              return typeof v === 'string' && /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/.test(v);
            },
          message: 'Login Id must contain at least a number and a letter',
        },  

    },
    mobile_number: {
        type: Number,
        required: true,
        min: [6000000000, "Enter a valid Phone Number"],
        max: [9999999999, "Enter a valid Phone Number"]
    },
    address: addressSchema,
    socketId: {
        type: String,
    }

},
    { timestamps: true },
    { Collection: "users" }
)

export const User = mongoose.model('User', UserSchema)