import React from "react";
//import logo from "./logo.svg";
import "./App.css";
import Card from "./View/Component/Card/Card";
import { NewsAPI } from "./JavaScript/NewsAPI_DAO";
import NavBar from "./View/Component/NavBar/NavBar";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.items = this.props.items
    // this.state = {
    //   error: null,
    //   isLoaded: false,
    //   items: []
    // };
  }

  // componentDidMount() {
  //   console.log(this.props.route);
  //   new NewsAPI().getTop().then(
  //     result => {
  //       this.setState({
  //         isLoaded: true,
  //         items: result
  //       });
  //     },
  //     error => {
  //       this.setState({
  //         isLoaded: true,
  //         error
  //       });
  //     }
  //   );
  // }

  render() {
    console.log(this.items);
    debugger;
    // console.log('deu uma ');
    // const { error, isLoaded, items } = this.state;
    // if (error) {
    //   return <div>Error: {error.message}</div>;
    // } else if (!isLoaded) {
    //   return <div>Loading...</div>;
    // } else {
    //   if(this.props.route === '#top'){
    //     console.log('deu no app com rota');
    //   }
      return (
        <div className="App">
          <header className="App-header">
            <NavBar controller={this.props.controller}></NavBar>
          </header>
          <div id="mainContainer">
            {this.items.map((article, index) => (
              <Card news={article} key={index} controller={this.props.controller} />
            ))}
          </div>
        </div>
      );
    }
  }
// }

export default App;
