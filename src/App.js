import React, { createContext, useEffect, useState } from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { io } from "socket.io-client"

import "./App.css"
import Header from "./components/Header"
import Portal from "./components/Portal"
import User from "./components/User"
import ArticleContainer from "./components/ArticleContainer"

export const socket = io("46.196.40.88:3000")

const App = () => {
    return( 
        <Router>
          <div className="App">
              <div className="LeftBar"/>
              <div className="Content">
                <Header/>

                <Switch>
                  <Route path="/article/:articleSlug">
                    <ArticleContainer/>
                  </Route>
                  <Route exact={true} path="/">
                    <Portal/>
                  </Route>
                  <Route path="/user/:userName">
                    <User/>
                  </Route>
                  <Router path="/search/">
                    
                  </Router>
                </Switch>
              </div>
              <div className="RightBar"/>
          </div>
        </Router>
    )
  }


export default App
