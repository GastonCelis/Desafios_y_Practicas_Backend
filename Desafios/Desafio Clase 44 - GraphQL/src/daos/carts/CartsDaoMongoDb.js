const { Schema } = require("mongoose");
const ContainerMongoDb= require("../../containers/ContainerMongoDB");

class ProductsDaoMongoDb extends ContainerMongoDb{
    constructor() {
        super("products", new Schema({
            name: { type: String, required: true },
            description: { type: String, required: true },
            code: { type: Number, required: true },
            price: { type: Number, required: true },
            stock: { type: Number, required: true },
            photo: { type: String, required: true },
            timestamp: { type: Date, default: Date.now(), required: true}
        }))
    }
};

module.exports = ProductsDaoMongoDb;