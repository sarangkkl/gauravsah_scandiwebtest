import React, { Component } from 'react';
import "./CartPage.scss";
import { CartPageCard } from '../../components/'
import { connect } from 'react-redux';


export class CartPage extends Component {
  render() {

    // Function whose purpose to get the total price of the cart
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
    // Function whose purpose to get the total quantity of the cart
    const getTotalItem = () =>{
      let totalItem = 0;
      this.props.cart.forEach(item => {
        totalItem += item.quantity;
      });
      return totalItem;
    }

    return (
      <div className='cart__page__container'>
        <p className='page__title'>CART</p>
        {this.props.cart.map((item,index)=>(
            <CartPageCard key={index} item={item} index={index}/>
        ))}

        <p>TAX 21% : <span className='total__price__tax'>{this.props.currencySymbol} {parseFloat(getTotalPrice(this.props.currencyState)*.21).toFixed(2)}</span></p>
        <p>Quantity: <span className='total__price__tax'>{getTotalItem()}</span></p>
        <p>Total   : <span className='total__price__tax'>{this.props.currencySymbol} {(Number(parseFloat(getTotalPrice(this.props.currencyState)*.21).toFixed(2))+Number(getTotalPrice(this.props.currencyState))).toFixed(2)}</span></p>

        <div>
          <button className='ordered__btn'>ORDER</button>
        </div>
      </div>
    )
  }
}

const  mapStateToProps = (state) =>{
  return {
      currencyState:state.currency.currencyState,
      cart:state.cart.cart.cartItems,
      currencySymbol:state.currency.currencySymbol,
  }
}


export default connect(mapStateToProps,{}) (CartPage);