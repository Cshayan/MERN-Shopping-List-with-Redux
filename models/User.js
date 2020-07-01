/* Model for User */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// UserSchema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'Please add an email']
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    register_date: {
        type: Date,
        default: Date.now
    }
});

// Encrypt the password
UserSchema.pre('save', async function () {
    // generate salt
    const salt = await bcrypt.genSalt(10);

    // hash the password
    this.password = await bcrypt.hash(this.password, salt);
});

// Generate JWT token
UserSchema.methods.generateJWTToken = function () {
    return jwt.sign({
        id: this._id
    }, process.env.JWT_SECRET, {
        expiresIn: 3600
    });
}

// Compare user entered password with hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}


module.exports = mongoose.model('User', UserSchema);