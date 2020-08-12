import React from "react";
import "./CardFooter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faAngleUp } from "@fortawesome/free-solid-svg-icons";

class CardFooter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="footer">
        <div className="socialB">
          <div
            className="buttons"
            onClick={() =>
              this.props.controller.RedirectToPage(this.props.news.url)
            }
          >
            <FontAwesomeIcon icon={faAngleUp} />
          </div>

          <div
            className="buttons"
            onClick={() => this.props.controller.FavNews(this.props.news)}
          >
            <FontAwesomeIcon icon={faHeart} />
          </div>
        </div>
      </div>
    );
  }
}

export default CardFooter;
