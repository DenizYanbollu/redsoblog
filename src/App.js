import React from "react"
import { BrowserRouter as Router, Switch } from "react-router-dom"

import "./App.css"
import Navbar from "./components/Navbar"
import ArticleContainer from "./components/ArticleContainer"

const App = () =>
  (
      <Router>
        <div className="App">
            <div className="LeftBar"/>
            <div className="Content">
              <ArticleContainer/>
            </div>
            <div className="RightBar"/>
            <Navbar>
              
            </Navbar>
        </div>
      </Router>
  )


export default App
