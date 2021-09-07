const redisClient = require("../redis")

function User(request) {
    return new Promise((res, rej) => {
        const {requestData} = request

        switch (requestData.requestType) {
            case "getUserByName": {
                redisClient.call(
                    "FT.SEARCH",
                    "user-index",
                    `@nick:${requestData.searchQuery}`
                , (_, val) => res(val))
                break;
            }

            default: {
                rej(false)
            }
        }
    })
}

module.exports = User