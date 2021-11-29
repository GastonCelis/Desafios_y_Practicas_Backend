const MessageDao = require("../daos/Messages")
const messageNormalize = require("../utils/normalizar")

const messageDao = new MessageDao()

const getMessages = async () => {
    const messages = await messageDao.readAll();

    return messageNormalize({ id: "messages", messages })
};

const saveMessage = async (message) => {
    const idMessage = await messageDao.create(message);

    return idMessage;
}

const m = getMessages()
console.log(m)

module.exports = {
    getMessages,
    saveMessage
}