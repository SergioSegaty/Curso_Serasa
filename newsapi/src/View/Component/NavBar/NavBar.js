import React from "react";
import "./NavBar.css";
import Paises from "../../../Models/Paises";

class NavBar extends React.Component {
  render() {
    return (
      <nav id="NavMenu">
        <div>
          {this.props.route === "#top" && (
            <select
              id="selectPaises"
              onChange={() => this.props.metodos.porPais(document.getElementById('selectPaises').value)}
            >{
                Paises().map((pais, index) => {
                  return (<option key={pais + index} defaultValue={this.props.search === pais.sigla ? 'selected' : ''} value={pais.sigla}>{pais.nome}</option>)
                })
            }
            </select>
          )}

          {this.props.route === "#all" && <input
            id='inputQuery'
            placeholder='Pesquisar...'
            onKeyDown={(e) => {
                if(e.keyCode === 13){
                    this.props.metodos.porQuery(e.target.value);
                }
            }} 
          >
          </input>}
        </div>
        <ul>
          <li key='pais'>
            <a href='#top' onClick={() => this.props.router('#top')}>Por País</a>
          </li>
          <li key='todos'>
            <a href='#all' onClick={() => this.props.router('#all')}>Por Conteúdo </a>
          </li>
          <li key='favoritos'>
            <a href='#favoritos' onClick={() => this.props.router('#fav')}>Favoritos </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavBar;
