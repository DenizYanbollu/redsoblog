import React from 'react'
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom"


import "./ArticlePreview.css"

const ArticlePreview = ({article}) => {
    if (typeof(article) !== "object") return null

    const articleObj = {} 
    let aL = article.length

    while(aL) {
        aL % 2 && (articleObj[article[aL-1]] = article[aL])
        aL--
    }

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
                {articleObj.publishDate} - <b>{articleObj.owner}</b> - {articleObj.tags}
            </div>
        </div>
    )
}

export default ArticlePreview
