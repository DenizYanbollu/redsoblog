const Article = require("../database/Article")

const schemaValidator = require("../schemaValidator")

function getArticle(socket) {   
    if (!schemaValidator(socket.requestData, socket.requestData.requestType)) return

    Article(socket)
        .then(res => socket.emit("response", res))
        .catch(rej => socket.emit("response", rej))
}

module.exports = getArticle 