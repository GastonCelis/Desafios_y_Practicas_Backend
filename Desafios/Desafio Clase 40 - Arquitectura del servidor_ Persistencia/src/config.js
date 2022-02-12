const config = {
    fileSystem: {
        path: "../DB"
    },
    mongodb: {
        host: "mongodb://127.0.0.1/ecommerce",
        options: {useNewUrlParser: true,useUnifiedTopology: true,serverSelectionTimeoutMS: 10000}
    }
    
}

module.exports = config