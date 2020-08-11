import React from "react";
import './Card.css';
import CardFooter  from "./CardFooter.js";

function Card(props) {
  return (
    <div className="card">
      <div className="row">
        <h2 className="title">{props.news.title}</h2>
      </div>

      <span className="auth"> {props.news.author} </span>
      <div className="img"></div>

      <div className="content"> 
        <h4> {props.news.publishedAt}</h4>

        <p> {props.news.description} </p>
      </div>

      <CardFooter news={props.news} />
    </div>
  );
}

export default Card;