const { Schema } = require("mongoose");
const Container= require("../Container");

class Message extends Container{
    constructor() {
        super("messages", new Schema({
            author: {
                id: { type: String, required: true },
                nombre: { type: String, required: true },
                apellido: { type: String, required: true },
                edad: { type: Number, required: true },
                alias: { type: String, required: true },
                avatar: { type: String, required: true }
            },
            text: { type: String, required: true },
            date: { type: String, default: Date.now(), required: true}
        }))
    }
};

module.exports = Message;