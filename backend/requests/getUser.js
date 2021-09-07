const User = require("../database/User")

const schemaValidator = require("../schemaValidator")

function getUser(socket) {   
    if (!schemaValidator(socket.requestData, socket.requestData.requestType))
        return socket.emit("response", "Error!")

        console.log("getUser")
        User(socket)
            .then(res => socket.emit("user:get:response", res))
            .catch(rej => socket.emit("user:get:response", false))
}

module.exports = getUser 