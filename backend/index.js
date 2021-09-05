const httpServer = require("http").createServer()
const io = require("socket.io")(httpServer,  {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true
    }
  })
const socketHandler = require("./socketHandler")

io.on('connection', (socket) => {
  socketHandler(socket)
  socket.emit("connection", true)
  console.log("Bağlandı")
})

httpServer.listen(3000, () => {
  console.log('listening on *:3000')
})