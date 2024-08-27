import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";

//pages
import News from "./News";
import Detail from "./Detail";
import NotFound from "./NotFound";


function App() {
  const [articles, setArticles] = useState([]);
  const [currentArticle, setCurrentArticle] = useState("")
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("")

  useEffect(() => {
    fetch('http://127.0.0.1:8000/articles')
    .then(response => response.json())
    .then(data => setArticles(data.articles))
    .catch(error => console.error('Error fetching articles:', error));
  }, []);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/categories')
      .then(response => response.json())
      .then(data => setCategories(data.categories))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);



  return (
    <PrimeReactProvider>
      <div>
        <Routes>
          <Route path="/" element={<News categories={categories} setCurrentCategory={setCurrentCategory} currentCategory={currentCategory} articles={articles} setCurrentArticle={setCurrentArticle}/>}></Route>
          <Route
            path='/detail'
            element={<Detail article={currentArticle} setCurrentCategory={setCurrentCategory}/>}
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </PrimeReactProvider>
  );
}

export default App;
