const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)

const socketHandler = require("./socketHandler")

io.on('connection', (socket) => socketHandler(socket))

server.listen(3000)