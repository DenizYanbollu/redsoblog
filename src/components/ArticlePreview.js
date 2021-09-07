import React from 'react'
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom"
import parseRedis from '../utils/parseRedis'


import "./ArticlePreview.css"

const ArticlePreview = ({article}) => {
    if (typeof(article) !== "object") return null

    const articleObj = parseRedis(article)

    const publishDate = new Date(articleObj.publishDate * 1000)
        .toLocaleString("tr-TR", {year: "numeric", month: "long", day: "numeric"}) // 2000 Ocak 1
    // Kullanıcıyı UUIDsine göre cachele

    return (
        <div className="ArticlePreview">
            <div className="Title">
                <Link to={`/article/${articleObj.slug}`}>
                    {articleObj.title}
                </Link>
            </div>
            <div className="Desc">
                {articleObj.description}
            </div>
            <div className="Info">
                {publishDate} - 
                <b> <Link to={`/user/${articleObj.owner}`}>{articleObj.owner}</Link></b> - {articleObj.tags}
            </div>
        </div>
    )
}

export default ArticlePreview
