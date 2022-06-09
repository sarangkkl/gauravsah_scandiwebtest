import React, {  Component } from "react";
import CartCard from "../CartCard/CartCard";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { getTotalPrice } from '../../store/reducers/cartReducer';
import "./OverlayCart.scss";
export class Overlaycart extends Component {
  render() {
    // console.log(this.props.cart);
    const getTotalPrice = (curren)  =>{
      let totalPrice = 0;
      this.props.cart.forEach(item => {
        let price =item.product.prices.find(
                  (e) => e.currency.label === curren
                ).amount
        totalPrice = totalPrice + item.quantity*price
        // totalPrice += item.price;
      });
      return parseFloat(totalPrice).toFixed(2);
    }
    const getTotalItem = () =>{
      let totalItem = 0;
      this.props.cart.forEach(item => {
        totalItem += item.quantity;
      });
      return totalItem;
    }
    return (
      <div className="cart__box">
        <p ><span><span className="cart__title">My bag</span>,</span>{getTotalItem()} items</p>
        <div className="d__cart__items">
        {this.props.cart.map((item,index)=>(
            <CartCard key={index} item={item} index={index}/>
          ))}
        </div>
        <p className="total__price">Total: {this.props.currencySymbol} {getTotalPrice(this.props.currencyState)}</p>
        
        <div className="cart__menu__action">
          <Link to={"/cart"}><button>VIEW BAG</button></Link>
          
          <button className="checkout__button">CHECK OUT</button>
        </div>
        
      </div>
    );
  }
}


const  mapStateToProps = (state) =>{
  return {
      currencyState:state.currency.currencyState,
      currencySymbol:state.currency.currencySymbol,
      cart:state.cart.cart.cartItems
  }
}
export default connect(mapStateToProps,{})(Overlaycart);