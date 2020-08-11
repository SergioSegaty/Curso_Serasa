import React from "react";
import "./CardFooter.css";


function CardFooter(news) {
    return(
        <div className="footer">
            <div className="socialB">
                <div className="buttons">
                    <i className="fa fa-heart"></i>
                </div>
        

                <div className="buttons">
                    <i className="fa fa-twitter"></i>
                </div>
            </div>
        </div>
    )
}

export default CardFooter;