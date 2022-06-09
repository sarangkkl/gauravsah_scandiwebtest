import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Loader } from '../../components'
import { connect } from 'react-redux';
import { toggleCurrency } from '../../store/reducers/currencyReducers';
import OverlayCart from '../OverlayCart/OverlayCart';


import "./Navbar.scss";


export class Navbar extends Component {

  constructor(props){
    super(props)
    this.state={
      categories: [],
      currency: [],
      loading: true,
      toggleCart: false,
    }
    this.props.toggleCurrency("USD")
  }
  
  componentDidMount(){
    const query = `
    query Query {
      categories {
        name
      }
      currencies {
        label
        symbol
      }
    }
    `
    fetch("http://localhost:4000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query,
        
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        
        this.setState({
          categories: data.data.categories,
          currency: data.data.currencies,
          loading: false,
        });
        
        
      });
  }

  handleToggleCurrency(value){
    this.props.toggleCurrency(value)
  }
  
 
  


  render() {

    const getTotalItem = () =>{
      let totalItem = 0;
      this.props.cart.forEach(item => {
        totalItem += item.quantity;
      });
      return totalItem;
    }
    
    if(this.state.loading===true){
      <Loader/>
    }else{
        return (
          <nav className='nav__bar'>
            <div className="category__link">
            {this.state.categories.map((item,index)=>(
              <NavLink key={index} to={`/${item.name}`} className={({ isActive }) => isActive? "active": ''}>{item.name[0].toUpperCase()+item.name.substring(1)}</NavLink>
            ))}
              </div>
              <div className="logo__section">
                  <NavLink to={"/"}><img src="assets/images/a-logo.png" alt="scandiweb ecommerce" /></NavLink>
              </div>
              <div className="nav__action">

                <select onChange={(e)=>{this.handleToggleCurrency(e.target.value)}}>
                  {this.state.currency.map((item,index)=>(
                    <option key={index} value={`${item.label}+${item.symbol}`}>{item.symbol}&nbsp; {item.label}</option>
                  ))}
                </select>
                <button className='logo__btn' onClick={()=>{this.setState({
                  toggleCart: !this.state.toggleCart
                })}}><img src="assets/images/empty.png" alt="" className='cart__img'/><span className='cart__items'>{getTotalItem()}</span></button>
                {this.state.toggleCart?<OverlayCart/>:null}
              </div>
          </nav>
        )
    }
  }
}

const  mapStateToProps = (state) =>{
  return {
      currencyState:state.currency.currencyState,
      cart:state.cart.cart.cartItems
  }
}

export default connect(mapStateToProps,{toggleCurrency}) (Navbar)