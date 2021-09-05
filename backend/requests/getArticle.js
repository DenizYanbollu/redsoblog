const Article = require("../database/Article")

const schemaValidator = require("../schemaValidator")

function getArticle(socket) {   
    if (!schemaValidator(socket.requestData, socket.requestData.requestType))
        return socket.emit("response", "Error!")

    Article(socket)
        .then(res => socket.emit("article:get:response", res))
        .catch(rej => socket.emit("article:get:response", rej))
}

module.exports = getArticle 