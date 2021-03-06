const getArticle = require("./requests/getArticle")
const getUser = require("./requests/getUser")
const setArticle = require("./requests/setArticle")

function socketHandler(socket) {
    socket.emit("response", "response")
    socket.on("article:get", data => getArticle(Object.assign(socket, {"requestData": data})))
    socket.on("article:set", data => setArticle(Object.assign(socket, {"requestData": data})))
    socket.on("user:get", data => getUser(Object.assign(socket, {"requestData": data})))
}
module.exports = socketHandler