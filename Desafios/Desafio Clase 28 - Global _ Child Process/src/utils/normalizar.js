const { normalize, schema } = require("normalizr")

const schemaAuthor = new schema.Entity("author", {}, {idAttribute: "email"})

const schemaMessage = new schema.Entity("message", {
    author: schemaAuthor
})

const schemaMessages = new schema.Entity("messages", {
    messages: [schemaMessage]
})

const messageNormalize = (message) => normalize(message, schemaMessages)

module.exports = {
    messageNormalize,
    schemaMessages
}