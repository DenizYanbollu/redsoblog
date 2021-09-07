const { v4: uuidv4 } = require('uuid');

const redisClient = require("../redis")

function Article(request) {
    const {requestData} = request

    console.log(requestData)

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

            case "getArticles": {
                const {searchQuery} = requestData

                const queries = []

                if (searchQuery.fromUser.length === 1) {
                    queries.push(`@owner:${searchQuery.fromUser}`)  
                } 

                redisClient.call(
                    "FT.SEARCH",
                    "article-index",
                    queries
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

            case "getArticleBySlug": {
                redisClient.call(
                    "FT.SEARCH",
                    "article-index",
                    `@slug:${requestData.searchQuery.split("-")}`
                , (_, val) => res(val))
                break;
            }

            case "getArticleByUUID": {
                    console.log(requestData)
                    redisClient.hgetall(`article:${requestData.searchQuery}`, (_, val) => res(val))
                break;
            }

            case "getAllArticles": {
                    redisClient.call(
                        "FT.SEARCH",
                        "article-index","*",
                        "SORTBY", "publishDate",
                        "DESC",
                        "LIMIT", requestData.start, requestData.start+10,
                    (_, val) => res(val))
                break;
            }

            default: 
                rej(false)
            break;
        }
    })
}

module.exports = Article