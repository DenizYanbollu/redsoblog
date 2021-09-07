import React, { useEffect, useState } from 'react'

import { useParams, useHistory } from 'react-router'

import "./User.css"

import { socket } from "../App"
import ArticlePreview from './ArticlePreview'
import parseRedis from '../utils/parseRedis'

const User = () => {
    const history = useHistory()

    const [user, setUser] = useState(false)
    const [userObj, setUserObj] = useState(false)

    const [searchResult, setSearchResult] = useState(false)

    const {userName} = useParams()

    useEffect(() => {
        socket.emit("user:get", {
            "requestType": "getUserByName",
            "searchQuery": userName
        })
        socket.emit("article:get", {
            "requestType": "getArticles",
            "searchQuery": {
                "fromUser": [userName]
            }
        })
    }, [])

    useEffect(() => setUserObj(parseRedis(user)), [user])

    socket.on("user:get:response",
        userData => (userData == null || userData == 0) ? history.goBack() : setUser(userData[2]))

    socket.on("article:get:response",
        article => setSearchResult(article))
    return (
        <div className="User">
            <div className="ProfileHeader">
                <img className="userImage"
                    src={userObj.avatar}/>
                <div className="userInfo">
                    <div className="fullName">
                        {userObj.username}
                    </div>
                    <div className="nick">
                        @{userObj.nick}
                    </div>
                </div>
            </div>
            <div className="ArticleSearch">
                <div className="fatTitle">{userObj.username}'s Articles</div>
                {searchResult && (searchResult.map((article, i) => <ArticlePreview key={i} article={article}/>))}
            </div>
        </div>
    )
}

export default User
