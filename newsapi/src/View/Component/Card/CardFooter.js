import React from "react";
import "./CardFooter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

class CardFooter extends React.Component {
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
            onClick={async (event) => {
              let newNews = await this.props.controller.FavNews(
                this.props.news,
                event
              );
              let id = newNews.id;
              this.props.dispatch({
                type: "update/single",
                news: newNews,
                id,
                route: this.props.route,
              });
            }}
          >
            {this.props.news.favorited === true && (
              <FontAwesomeIcon icon={faHeart} className="faved" />
            )}
            {this.props.news.favorited === false && (
              <FontAwesomeIcon icon={faHeart} />
            )}
          </div>
        </div>
      </div>
    );
  }
}
const MapStateToProps = (state) => {
  return {
    items: state.items,
    route: state.route,
    serach: state.search,
  };
};

export default connect(MapStateToProps)(CardFooter);
