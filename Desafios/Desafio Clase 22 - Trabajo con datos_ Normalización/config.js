const config = {
    mongodb: {
        host: "mongodb://127.0.0.1/ecommerce",
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        }
    }
}

module.exports = config