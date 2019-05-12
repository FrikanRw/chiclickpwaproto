import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';

import config from '../assets/config';

import '../checkout.css';


const products=config.products




const styles = {

  card: {
    backgroundColor: '#000000',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#282828',
    height: '70vh',
    width: 307,
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
      marginBottom:0,
      fontSize:18,
      fontWeight:800,
    },
  cardSubTitle:
    { 
      marginTop: 0,
      marginLeft:20,
      color:'#c2c2c2c2',
      fontSize:16,
      fontWeight:800,
    },
  cardPrice:
    { 
      color:'#FFCB17',
      fontSize:18,
      fontWeight:800,
      margin: 0,

    },
};

class CheckOutPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trolley:[],
      orderPlaced:false,
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

      placeOrder=()=>{
        const {trolley} =this.state
        let order = []
        const items =[]
        trolley.forEach(item=>{
          const product=products.find(product=>(product.id===item.id));
          if(product){
            items.push({
              product:`${product.productname}-${product.subtitle}`,
              amount:item.amount
          })
          }
      })
      order=[{price:this.calcPrice(), status:'pending'}, ...items]
      this.props.firebase.postOrder({order})
      .then(response=>{this.setState({orderId:response.id, orderPlaced:true});  setInterval(()=>this.checkStatus(), 2500);})
      .catch(err=>console.warn(err));
    }

      checkStatus =async()=>{
        let orderStatus = await this.props.firebase.getOrderStatus(this.state.orderId);
        console.log(orderStatus)
        if(orderStatus){
          this.setState({orderStatus})
        }
      }


    getOrderStatus= ()=>{
      console.log('Test')
      switch (this.state.orderStatus) {
        case 'pending':
          return(<p style={{color:'#fff'}}>YOUR ORDER IS PENDING, ORDER #{this.state.orderId}</p>)
        case 'prepare':
          return(<p style={{color:'#fff'}}>YOUR ORDER IS BEING PREPARED, ORDER #{this.state.orderId}</p>)
        case 'deliver':
          return(<p style={{color:'#fff'}}>YOUR ORDER IS OUT ON DELIVERY AND WILL BE WITH YOU SOON, ORDER #{this.state.orderId}</p>)
        default:
        return(<p style={{color:'#fff'}}>YOUR ORDER IS PENDING</p>)
      }
    }
  

  render() {
    
    const { classes } = this.props;
    const {trolley}=this.state
    return (
      <div style={{
         height: '93vh',
         overflow:'scroll'
      }}
      >

        <div className="menu-column">
        {!this.state.orderPlaced ?
        <>
        <h3 className="order-title">YOUR ORDER</h3>

            <Card  className={classes.card}>
            <CardContent className={classes.cardContent}>
            <div style={{ display:'flex',
                flexDirection:'column',
                justifyContent:'flex-start',}}>
                {            
              trolley.map(item=>{
                const product=products.find(product=>(product.id===item.id));
                if(item.amount!==0){
                  return(
                    <div style={{height: 110}}>
                    <div style={{marginTop:35}} className="divider"/>
                    <div style={{    
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'baseline'}}>
                    <div style={{flexDirection:"column", display:'flex'}}>
                    <p className={classes.cardTitle}>{product.productname}</p>
                    <p className={classes.cardSubTitle}>{product.subtitle}</p>
                    </div>
                    <div style={{flexDirection:"column", display:'flex', justifyContent: 'center',alignItems: 'center', marginLeft: 95}}>
                    <p className={classes.cardPrice}>{product.price}</p>
                    <div style={{flexDirection:"row", display:'flex' }}>
                    <p onClick={()=>this.removeProductFromTrolley(product.id)} className='checkbutton'><i className="fas fa-minus"></i></p>
                    <p style={{color:'#fff', marginLeft:5, marginRight:5}}>{this.findValue(product)}</p>
                    <p onClick={()=>this.addProductToTrolley(product.id)} className='checkbutton'><i className="fas fa-plus"></i></p>
                    </div>
                    </div>
                    </div>
                    </div>
                    )
                }
              })}
              </div>
              <div style={{borderColor:config.color.primary, marginTop:35}} className="divider"/>
              <div style={{borderColor:config.color.primary, marginTop:5}} className="divider"/>
              <div style={{paddingLeft: 10}}>
              <p style={{fontSize:24, fontWeight:800, color:'#fff'}}>
                {`Total: R ${this.calcPrice()}`}
                </p>
              </div>

            </CardContent>
          </Card>
          </>
          :
          <div style={{flexDirection:'column', justifyContent:'center', display:'flex', alignItems:'center', textAlign:'center'}}>
          {this.getOrderStatus()}
          <div className='loader'/>
          </div>}
        </div>
        {!this.state.orderPlaced &&
        <div
        onClick={()=>this.placeOrder()}
          className="total-container"
        >
        <p style={{fontSize:32, fontWeight:800, color:'#fff'}}>
        PLACE ORDER
        </p>
        <p className='checkout'><i style={{color : '#fff', marginLeft:30, fontSize: 32}} className="fas fa-check-circle"></i>
        </p>
        </div>}
      </div>
    );
  }
}

export default withStyles(styles)(CheckOutPage);
