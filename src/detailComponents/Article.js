import React, { Component } from "react";
import { Card } from "primereact/card";
import NewsDetail from "./NewsDetail";
import Title from './Title'
import Subtitle from "./Subtitle";

function Article({article}) {
  
  return (
    <div className="flex justify-content-center align-items-center border-round-2xl shadow-2 m-3 ">
    
      <Card title={<Title article={article}/>} subTitle={<Subtitle article={article}/>}>
        <p className="m-0 lg:px-6 p-3 pb-5 text-600">{article.full_text}</p>
        <NewsDetail article={article} />
      </Card>
    </div>
  );
}

export default Article;
