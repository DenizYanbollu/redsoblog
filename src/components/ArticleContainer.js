import React , {useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

import "./ArticleContainer.css"

import parseRedis from '../utils/parseRedis'

import { socket } from '../App'

const ArticleContainer = () => {
    const {articleSlug} = useParams()

    const [user, setUser] = useState(false)
    const [article, setArticle] = useState(false)
    const [articleObj, setArticleObj] = useState(false)

    useEffect(() => {
        socket.emit("article:get", {
            "requestType": "getArticleBySlug",
            "searchQuery": articleSlug
        })
    }, [])

    useEffect(() => {
        const parsedArticle = parseRedis(article)

        setArticleObj(parsedArticle)

        socket.emit("user:get", {
            "requestType": "getUserByName",
            "searchQuery": parsedArticle.owner
        })
    }, [article])

    const publishDate = new Date(articleObj.publishDate * 1000)
        .toLocaleString("tr-TR", {year: "numeric", month: "long", day: "numeric"}) // 2000 Ocak 1

    socket.on("article:get:response", articleList => setArticle(articleList[2]))
    socket.on("user:get:response", user => setUser(parseRedis(user[2])))
    
    console.log(articleObj)
    return (
        <div className="ArticleContainer">
            <div className="ArticleHeader">
                <span className="fatTitle">
                    {articleObj.title}
                    </span>
                <div className="info">
                    <img className="userImage"
                        src={user.avatar}/>
                    <Link to={"/user/"+articleObj.owner}>
                        <span className="user Montserrat">
                            {user.username}
                        </span>
                    </Link>
                    <span className="date Montserrat">
                        {publishDate}
                    </span>
                </div>
                <div className="text">
                    {articleObj.content}
                </div>
            </div>
        </div>
    )
}

export default ArticleContainer
