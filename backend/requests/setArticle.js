const Article = require("../database/Article")

const schemaValidator = require("../schemaValidator")

function submitArticle(socket) {
    if (!schemaValidator(socket.requestData, socket.requestData.requestType))
        return socket.emit("response", "Error!")
    
    Article(socket)
        .then(res => socket.emit("article:set:response", res))
        .catch(rej => socket.emit("article:set:response", rej))
}

module.exports = submitArticle