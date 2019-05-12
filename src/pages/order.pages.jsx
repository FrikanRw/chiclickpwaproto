import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import config from '../assets/config';

import '../order.css';


const products=config.products




const styles = {

  card: {
    backgroundColor: '#000000',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#282828',
    height: 361,
    width: 336,
    borderRadius: 10,
    margin:5,
  },
  cardContent:{
    padding:2
      },
  cardTitle:
    { 
      marginLeft:20,
      color:'#fff',
      marginTop: 40,
      fontSize:18,
      fontWeight:800,
    },
  cardSubTitle:
    { 
      marginLeft:20,
      color:'#c2c2c2c2',
      fontSize:16,
      fontWeight:800,
    },
  cardPrice:
    { 
      marginLeft:20,
      color:'#FFCB17',
      fontSize:42,
      fontWeight:800,
      marginTop: 0
    },
};

class OrderPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trolley:[]
    };
  }

  componentDidMount(){
    this.setState({trolley:this.props.trolley})
  }

  addProductToTrolley=(productId)=>{
      const {trolley} = this.state;
      const item = trolley.filter(item=>(item.id===productId))
      trolley.forEach(item=>
        {
          if(item.id===productId){
          item.amount= item.amount+1;
        }}
        )
      if(item.length===0){
        trolley.push({id:productId, amount:1})
        }
      this.setState({trolley},()=>this.props.loadGlobalTrolley(this.state.trolley))
  }
  removeProductFromTrolley=(productId)=>{
    const {trolley} = this.state;
    const item = trolley.filter(item=>(item.id===productId))
    trolley.forEach(item=>
      {
        if(item.id===productId && item.amount>0){
        item.amount = item.amount-1;
      }}
      )
    if(item.length===0){
      trolley.push({id:productId, amount:0})
      }
    this.setState({trolley},()=>this.props.loadGlobalTrolley(this.state.trolley))
    
}
componentDidUnMount(){
  this.props.loadGlobalTrolley(this.state.trolley)
}

  findValue=(product)=>{
    const {trolley} = this.state;
    const productItem =trolley.filter(item=>(item.id===product.id))
    console.log(productItem)
    if(productItem.length===0){
    return 0}
    return productItem[0].amount
  }
  calcPrice=()=>{
    const {trolley} = this.state;
    let total =0;
      for (let index = 0; index < trolley.length; index++) {
        const element = trolley[index];
        const product = products.filter(product=>(product.id=== element.id))
         console.log(product)
          let price = parseFloat(product[0].price)
          total = total+(price*element.amount)
          }
          
          return total.toFixed(2);
      }
  

  render() {

    const { classes } = this.props;
    return (
      <div style={{
         height: '93vh',
         overflow:'scroll'
      }}
      >

        <div className="menu-column">
        {
          products.map(product =>(

            <Card key={product.id} className={classes.card}>
            <CardContent className={classes.cardContent}>
            <div style={{
              display:'flex',
              flexDirection:"row",

            }}>
            <div style={{width: 160}}>
            <p className={classes.cardTitle}>{product.productname}</p>
            <p className={classes.cardSubTitle}>{product.subtitle}</p>
            <p className={classes.cardPrice}>{product.price}</p>
            </div>
            <div style={{width: 160, flexDirection:'row', display:'flex', justifyContent:'space-evenly', alignItems:'baseline'}}>
              <p onClick={()=>this.removeProductFromTrolley(product.id)} className='button'><i className="fas fa-minus"></i></p>
              <p style={{color:'#fff'}}>{this.findValue(product)}</p>
              <p onClick={()=>this.addProductToTrolley(product.id)} className='button'><i className="fas fa-plus"></i></p>
            </div>
            </div>
            <img alt='' style={{width:'80%'}} src={product.image}/>
            </CardContent>
            </Card>
          ))
        }

        </div>
        <div
          className="total-container"
        >
        <p style={{fontSize:32, fontWeight:800, color:'#fff'}}>
        {`Total: R ${this.calcPrice()}`}
        </p>
        <Link  to={'/checkout'} style={{textDecorationLine: 'none'}}>
        <p className='checkout'><i style={{color : '#fff', marginLeft:30, fontSize: 32}} className="fas fa-money-check-alt"></i>
        </p>
        </Link>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(OrderPage);
