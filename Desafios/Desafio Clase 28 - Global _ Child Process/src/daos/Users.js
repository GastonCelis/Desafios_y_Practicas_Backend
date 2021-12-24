const { Schema } = require("mongoose");
const Container= require("../Container");

class User extends Container{
    constructor() {
        super("users", new Schema({
            username: { type: String },
            password: { type: String },
            email: { type: String },
            firstName: { type: String },
            lastName: { type: String }
        }))
    }
};

module.exports = User;