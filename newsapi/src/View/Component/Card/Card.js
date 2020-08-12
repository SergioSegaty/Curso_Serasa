import React from "react";
import "./Card.css";
import CardFooter from "./CardFooter.js";
import News from "../../../Models/News.js";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.article = new News(this.props.news);
  }

  render() {
    return (
      <div className="card">
        <div className="row">
          <h2 className="title">{this.article.title}</h2>
        </div>

        <span className="auth"> {this.article.author} </span>

        <div className="content">
          <div className="img">
            <img src={this.article.imageUrl} alt="News"></img>
          </div>
          <h4> {this.article.publishedAt}</h4>

          <p> {this.article.description} </p>
        </div>

        <CardFooter news={this.article} controller={this.props.controller} />
      </div>
    );
  }
}

export default Card;
