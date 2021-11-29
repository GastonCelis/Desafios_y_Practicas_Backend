const MessageDao = require("../daos/Messages")
const { normalizeMessages } = require("../utils/normalizar")

const messageDao = new MessageDao()

const getMessages = async () => {
    const messages = await messageDao.readAll();

    return normalizeMessages({ id: "messages", messages })
};

const saveMessage = async (message) => {
    const idMessage = await messageDao.create(message);

    return idMessage;
}

module.exports = {
    getMessages,
    saveMessage
};