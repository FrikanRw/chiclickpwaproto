import React, { Component } from 'react';
import '../carousel.css';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import config from '../assets/config';

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

  cardTitle: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 600,
    fontSize: 18,
  },

};

class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div style={{
        height: '93vh',
      }}
      >
        <div style={{
          borderBottomColor: config.color.primary,
          borderBottomWidth: 3,
          borderBottomStyle: 'solid',
          borderTopColor: config.color.primary,
          borderTopWidth: 3,
          borderTopStyle: 'solid',
        }}
        >
          <Carousel showStatus={false} showThumbs={false} showArrows>
            <div>
              <img alt="" src={img1} />
              <p className="legend">Special</p>
            </div>
            <div>
              <img alt="" src="assets/2.jpeg" />
              <p className="legend">Special</p>
            </div>
            <div>
              <img alt="" src="assets/3.jpeg" />
              <p className="legend">Special</p>
            </div>
          </Carousel>
        </div>
        <div style={{ marginTop: 10, paddingLeft: 10, paddingRight: 10 }} className="card-container">
          <Grid justify="center" alignItems="center" container spacing={0}>
            <Grid item xs={6}>
              <Card className={classes.card}>
                <CardContent>
                  <p style={styles.cardTitle}>
                   Just HotWings
                  </p>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card className={classes.card}>
                <CardContent>
                  <p style={styles.cardTitle}>
                    Easy Bucks Menu
                  </p>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card className={classes.card}>
                <CardContent>
                  <p style={styles.cardTitle}>
                    Just Burgers
                  </p>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card className={classes.card}>
                <CardContent>
                  <p style={styles.cardTitle}>
                    Soulicous Specials
                  </p>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
        <div
          className="bottom-container"
        >
          <Link  to={'/order'} style={{textDecorationLine: 'none'}}>
            <p style={{ textAlign: 'center', color: '#fff', fontWeight: 800 }}>VIEW OUR WHOLE MENU    <i className="fas fa-chevron-right" /></p>
          </Link>

        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Homepage);
