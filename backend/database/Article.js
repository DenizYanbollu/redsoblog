const { v4: uuidv4 } = require('uuid');

const redisClient = require("../redis")


function Article(request) {
    const {requestData} = request

    return new Promise((res, rej) => {
        switch (requestData.requestType) {
            case "submitArticle": {
                    const articleUUID = uuidv4()

                    const {submitData} = requestData
                    
                    redisClient.hset(
                        `article:${articleUUID}`,
                        "uuid", articleUUID,
                        Object.keys(submitData)
                            .flatMap(key => [key, submitData[key]]),
                        "comments", 0
                    , (_, val) => res(val))              
                break;
            }

            case "getArticleByTitle": {
                    redisClient.call(
                        "FT.SEARCH",
                        "article-index",
                        `@title:${requestData.searchQuery}`
                    , (_, val) => res(val))
                break;
            }

            case "getArticleByUUID": {
                    redisClient.hgetall(`article:${requestData.searchQuery}`, (_, val) => res(val))
                break;
            }

            default: 
                rej(false)
            break;
        }
    })
}

module.exports = Article