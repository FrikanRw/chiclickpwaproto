import React, { Component } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import config from '../assets/config';

import '../menu.css';

const img1 = require('../assets/img/car1.jpg');

const styles = {

  card: {
    backgroundColor: '#ECA53C',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: config.color.primary,
    margin: 5,
    height: 120,
    borderRadius: 10,
  },

  cardTitle:
    {
      marginTop: 40,
      marginLeft: 40,
      marginRight: 190,
    }
  ,

};

class MenuPage extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div style={{
        backgroundColor: '#282c34', height: '93vh',
      }}
      >
        <div className="menu-container">
          <h3 className="menu-title">
            Menu
          </h3>
          <div className="menu-arrow">
            <i className="fas fa-chevron-right" />
          </div>
        </div>
        <div className="menu-container">
          <h3 className="menu-title">
            Specials
          </h3>
          <div className="menu-arrow">
            <i className="fas fa-chevron-right" />
          </div>
        </div>
        <div className="menu-container">
          <h3 className="menu-title">
          Get Some Delivered
          </h3>
          <div className="menu-arrow">
            <i className="fas fa-chevron-right" />
          </div>
        </div>
        <div className="menu-container">
          <h3 className="menu-title">
            Contact Us
          </h3>
          <div className="menu-arrow">
            <i className="fas fa-chevron-right" />
          </div>
        </div>


      </div>
    );
  }
}

export default withStyles(styles)(MenuPage);
