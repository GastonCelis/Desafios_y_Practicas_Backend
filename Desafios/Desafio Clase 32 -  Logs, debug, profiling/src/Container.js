const mongoose = require("mongoose")
const config = require("../config")
const dotenv = require("dotenv").config()

class Container{
    constructor(collection, schema){
        this.collection = mongoose.model(collection, schema)
        this.init()
    }

    async init() {
        if (!this.conection) {
            this.conection = await mongoose.connect(config.host, config.options)
        }
    }


    async create(product) {
        try {
            const document = await this.collection.create(product)
            return document._id
        } catch (error) {
            console.error(`¡Error!: ${error}`)
            return error
        }
    }


    async readAll(){
        try{
            const documents = await this.collection.find()
            return documents
        } catch(error) {
            console.error(`¡Error!: ${error}`)
        }
    }


    async readById(id){
        try{
            const documents = await this.collection.find({ _id: id })

            if(documents.length === 0){
                return false
            } else {
                return documents[0]
            }
        } catch (error) {
            console.error(`¡Error!: ${error}`)
        }
    }

    async readOneUser(username){
        try{
            const documents = await this.collection.findOne({ "username": username })

            if(documents.length === 0){
                return false
            } else {
                return documents
            }
        } catch (error) {
            console.error(`¡Error!: ${error}`)
            return error
        }
    }


    async update(id, product){
        try{
            const { n, nModified } = await this.collection.updateOne({ _id: id }, {
                $set: product
                })
            if (n == 0 || nModified == 0) {
                console.error(`El elemento con id: '${id}' no fue encontrado`);
                return false;
            }
        
            const elementUpdated = await this.getById(id);
    
            return elementUpdated;
        } catch(error){
            console.error(`¡Error!: ${error}`)
        }
    }


    async deleteAll(){
        try {
            await this.collection.deleteMany()
        } catch(error) {
            console.error(`¡Error!: ${error}`)
        }
    }

    
    async deleteById(id){
        try{
            await this.collection.deleteOne({ _id: id })
        } catch(error) {
            console.error(`¡Error!: ${error}`)
        }
    }
}

module.exports = Container