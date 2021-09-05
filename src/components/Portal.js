import React, { useContext, useState, useEffect } from 'react'

import "./Portal.css"

import ArticlePreview from './ArticlePreview'
import { socket } from '../App'


const Portal = () => {
    const [articleList, setArticleList] = useState([])
    const [articleStart, setArticleStart] = useState(0)
    
    const refreshArticles = () =>
        socket.emit("article:get", {
            "requestType": "getAllArticles",
            "start": 0
        })

    const loadArticles = (start = undefined) => { 
        socket.emit("article:get", {
            "requestType": "getAllArticles",
            "start": start ? start : articleStart
        })
        setArticleStart(articleStart => articleStart+10)
    }
    
    useEffect(() => {
        loadArticles(0)
    }, [])

    socket.on("article:get:response", 
        articleList => {
            setArticleList(articleList)
        })

    return (
        <div className="Portal">
            {
                articleList?.map((article, i) => {
                    return <ArticlePreview key={i} article={article}/>
                })
            }
        </div>
    )
}

export default Portal
