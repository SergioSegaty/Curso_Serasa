import React from "react";
import './Card.css';
import CardFooter from "./CardFooter.js";
import News from '../../../Models/News.js';

const toObjectNews = (props) => {
  let object = new News(props);
  return object;
}

function Card(props) {
  debugger;
  let news = toObjectNews(props.news)
  debugger;
  return (
    <div className="card">
      <div className="row">
        <h2 className="title">{news.title}</h2>
      </div>

      <span className="auth"> {news.author} </span>
      <div className="content">
        <div className="img">
          <img src={news.imageUrl}></img>
        </div>
        <h4> {news.publishedAt}</h4>

        <p> {news.description} </p>
      </div>

      <CardFooter news={news} />
    </div>
  );
}

export default Card;