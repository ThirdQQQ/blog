import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from '../Pages/Login'
import Home from '../Pages/Home'
import AddArticle from "../Pages/AddArticle";
import ArticleList from "../Pages/ArticleList";

export default function index() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/index/*'  element={<Home></Home>}>
          <Route path='addArticle' element={<AddArticle></AddArticle>}></Route>
          <Route path='list' element={<ArticleList></ArticleList>}></Route>
        </Route>
        <Route exact path='/'  element={<Login></Login>} ></Route>
      </Routes>
    </BrowserRouter>
  )
}

