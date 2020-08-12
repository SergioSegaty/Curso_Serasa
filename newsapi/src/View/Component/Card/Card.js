import React from "react";
import './Card.css';
import CardFooter from "./CardFooter.js";
import News from '../../../Models/News.js';


class Card extends React.Component {
  constructor(props) {
    super(props);

    this.article = props

  }

  render() {
    debugger;
    return (

      <div className="card">
        <div className="row">
          <h2 className="title">{this.article.title}</h2>
        </div>

        <span className="auth"> {this.article.author} </span>

        <div className="content">
          <div className="img">
            <img src={this.article.imageUrl}></img>
          </div>
          <h4> {this.article.publishedAt}</h4>

          <p> {this.article.description} </p>
        </div>

        <CardFooter news={this.article} />
      </div>
    )
  }
}

export default Card;