const { sendNotification } = require("../utils/notification");

const checkNotification = (isAdmin, cart) => {
    if (!isAdmin) {
        sendNotification('usuario borrando carrito', 'user@mail.com')
    }
};

module.exports = { 
    checkNotification
};