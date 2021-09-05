import React, { createContext, useEffect, useState } from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { io } from "socket.io-client"

import "./App.css"
import Navbar from "./components/Navbar"
import Header from "./components/Header"
import Portal from "./components/Portal"
import ArticleContainer from "./components/ArticleContainer"

export const socket = io("127.0.0.1:3000")

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
                  <Route path="">
                    <Portal/>
                  </Route>
                </Switch>
              </div>
              <div className="RightBar"/>
              <Navbar>
                
              </Navbar>
          </div>
        </Router>
    )
  }


export default App
