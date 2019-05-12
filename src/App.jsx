import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Homepage from './pages/home.pages';
import MenuPage from './pages/sidebar.pages';
import OrderPages from './pages/order.pages';
import CheckoutPages from './pages/checkout.pages';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#EF7C00',
    },
    secondary: {
      main: '#fff',
    },
  },
});


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trolley:[]
    };
  }

  componentDidMount(){
    this.props.firebase
    .doSignInWithEmailAndPassword('ferwee@gmail.com', 'Erwe3#26')
    .then((res) => {
      console.log(res)
      this.setState({ login:true });
    })

  }
  loadGlobalTrolley=(trolley)=>{
    console.log('loading',trolley)
    this.setState({trolley})
  }
  render(){
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <div>
          <IconButton color="secondary" aria-label="Menu">
            <MenuIcon />
          </IconButton>
        </div>
        <Router basename="/pwacl">
          <Route path="/" exact component={Homepage} />
          <Route path="/menu" exact component={MenuPage} />
          <Route path="/order" exact render={routeProps => (<OrderPages {...routeProps} {... this.state} loadGlobalTrolley={(trolley)=>this.loadGlobalTrolley(trolley)} />)}/>
          <Route path="/checkout" exact render={routeProps => (<CheckoutPages {...routeProps} {... this.state} firebase={this.props.firebase} loadGlobalTrolley={(trolley)=>this.loadGlobalTrolley(trolley)} />)}/>
        </Router>
      </MuiThemeProvider>
    </div>
  );
  }
}

export default App;
