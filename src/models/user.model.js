import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lower: true,
            trim: true,
            index: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lower: true,
            trim: true,
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        avatar: {
            type: String, //cause we store url which we get from third party services like s3
            required: true,
        },
        coverimage: {
            type: String
        },
        watchHistory: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Video",
            }
        ],
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        refreshToken: {
            type: String,
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.genrateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            fullname: this.fullname,
        }, 
        process.env.ACCESS_SECRET_TOKEN,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
        }
    );
}

userSchema.methods.genrateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        }, 
        process.env.REFRESH_SECRET_TOKEN,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
        }
    );
}

export const User = mongoose.model("User", userSchema);