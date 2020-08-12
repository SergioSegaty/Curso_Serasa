import React  from "react";
import './NavBar.css';

class NavBar extends React.Component {
  
    constructor(props){
        super(props);
    }

    render() {
        return(
            <nav id="NavMenu">
                <ul>
                    <li><a href="/top">Por Pái</a></li> 
                    <li><a href="/all">Por Conteúdo </a></li>
                    <li><a href="/fav">Favoritos </a></li>
                </ul>
            </nav>
        );
    }
}

export default NavBar;