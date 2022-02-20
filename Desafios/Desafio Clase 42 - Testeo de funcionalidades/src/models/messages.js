const MessageDao = require("../daos/Messages")
const messageNormalize = require("../utils/normalizar")

const messageDao = new MessageDao()

const getMessages = async () => {
    const messages = await messageDao.readAll()
    return messages
}

const saveMessage = async (message) => {
    const idMessage = await messageDao.create(message)
    return idMessage
}

const allMenssages = getMessages()
const normalizeMessage = messageNormalize({ id: "messages", allMenssages })

module.exports = {
    normalizeMessage,
    saveMessage
}