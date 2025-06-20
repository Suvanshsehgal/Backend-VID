import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullname: {
        type: String,  
        required: true, 
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 6
    },
    avatar: {
        type: String,
        required: true
    },
    referenceTokens: [{
        type: String,
        required: true
    }],
    watchHistory: [{
        type: Schema.Types.ObjectId,
        ref: "Video"
    }],
}
, {
    timestamps: true,   // Automatically adds createdAt and updatedAt fields 
    });

userSchema.pre("save",async function(next){
    if(this.isModified("password") === false) {
        return next(); // If password is not modified, skip hashing
    }
    this.password = await bcrypt.hash(this.password, 10); // Hash the password before saving
    next();
})

userSchema.methods.generateAcesssToken = function() {
    return jwt.sign({
        id: this._id,
        username: this.username,
        email: this.email
    }, process.env.JWT_SECRET, {
        expiresIn: "1" // Token expires in 1 hour
    })
} // Generate access token for the user

userSchema.methods.generateRefreshToken = function() {
 return jwt.sign({
        id: this._id,
        username: this.username,
        email: this.email
    }, process.env.JWT_SECRET, {
        expiresIn: "10" // Token expires in 1 hour
    })
} // Generate refresh token for the user

userSchema.methods.isPasswordCorrect= async function(password) {
    return await bcrypt.compare(password, this.password);
 } // Compare the provided password with the hashed password
 export const User = mongoose.model("User", userSchema);  