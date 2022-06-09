import React, { Component } from 'react';
import "./ProductCard.scss";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class ProductCard extends Component {
  render() {
    const { product } = this.props;
   
    return (
      <div className='product__card__box'>
        <div >
            {product.inStock ? <div className='img__box' style={{backgroundImage:`url(${product.gallery[0]})`}}>

            </div>:<div className='img__box' style={{backgroundImage:`url(${product.gallery[0]})`,opacity:"0.4"}}>
            <p className='product__out__of__stock'>OUT OF STOCK</p>
              </div>}
            
        </div>
        <div className="product__title__listing">
          <Link to={`/${product.id}`}>{product.brand}  {product.name} </Link>
        </div>
        <div className="product__price">
          <p>{(product.prices.find((e) => e.currency.label === this.props.currencyState)).currency.symbol} {(product.prices.find((e) => e.currency.label === this.props.currencyState)).amount}</p>
        </div>
      </div>
    )
  }
}

const  mapStateToProps = (state) =>{
  return {
      currencyState:state.currency.currencyState,
  }
}

export default connect(mapStateToProps,{}) (ProductCard)