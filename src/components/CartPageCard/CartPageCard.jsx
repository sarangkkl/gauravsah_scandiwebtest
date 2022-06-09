import React, { Component } from "react";
import "./CartPageCard.scss";
import { connect } from "react-redux";
import {
  addToCart,
  removeFromCart,
  decreaseQuantity,
} from "../../store/reducers/cartReducer";
export class CartPageCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      active__img: "",
      index__count: 0,
    };
  }

  componentDidMount() {
    this.setState({
      loading: false,
      active__img: this.props.item.product.gallery[0],
    });
  }

  render() {
    const add_cart = () => {
      this.props.addToCart(this.props.item);
    };
    const remove_cart = () => {
      this.props.decreaseQuantity(this.props.item);
    };

    const toggleImg = (type) => {
      if (
        type === "INC" &&
        this.state.index__count < this.props.item.product.gallery.length - 1
      ) {
        this.setState({
          active__img:
            this.props.item.product.gallery[this.state.index__count + 1],
          index__count: this.state.index__count + 1,
        });
      } else if (type === "DEC" && this.state.index__count > 0) {
        this.setState({
          active__img:
            this.props.item.product.gallery[this.state.index__count - 1],
          index__count: this.state.index__count - 1,
        });
      }
    };

    if (this.state.loading === true) {
      return <h1>LOADING....</h1>;
    } else {
      return (
        <div className="cart__page__card__box">
          <div className="main__box__cart__page">
            <div>
              <div className="product__title__cart__page">
                <p>
                  <span className="product__brand__cart__page">
                    {this.props.item.product.brand}
                  </span>
                  <br />{" "}
                  <span className="product__name__cart__page">
                    {this.props.item.product.name}
                  </span>
                </p>
              </div>
              <div className="product__price__cart__page">
                <p>
                  {
                    this.props.item.product.prices.find(
                      (e) => e.currency.label === this.props.currencyState
                    ).currency.symbol
                  }{" "}
                  {
                    this.props.item.product.prices.find(
                      (e) => e.currency.label === this.props.currencyState
                    ).amount
                  }
                </p>
              </div>
              <div className="attribute__cart__page">
                {this.props.item.product.attributes.map((attr, i) => (
                  <div key={i}>
                    {attr.id === "Color" ? (
                      <div>
                        <p className="attr__title">{attr.name} :</p>
                        <div className="outer__attribute">
                          {attr.items.map((x, j) => (
                            <div key={j}>
                              {this.props.item.variation[i].value ===
                              x.value ? (
                                <div className="attribute__color__selected">
                                  {/* {x.displayValue} */}
                                </div>
                              ) : (
                                <div className="attribute__color" style={{backgroundColor:`${x.value}`}}>
                                  {/* {x.displayValue} */}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="attr__title">{attr.name} :</p>
                        <div className="outer__attribute">
                          {attr.items.map((x, j) => (
                            <div key={j}>
                              {this.props.item.variation[i].value ===
                              x.value ? (
                                <div className="attribute__data__selected">
                                  {x.displayValue}
                                </div>
                              ) : (
                                <div className="attribute__data">
                                  {x.displayValue}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="action__cart__page">
              <div className="quant__btn">
                <button
                  onClick={() => {
                    add_cart();
                  }}
                >
                  +
                </button>
                {/* {console.log(this.props)} */}
                <div>{this.props.item.quantity}</div>
                <button
                  onClick={() => {
                    remove_cart();
                  }}
                >
                  -
                </button>
              </div>
              <div className="img__section">
                <div>
                  <img
                    src={this.state.active__img}
                    alt=""
                    className="all__img active"
                    id={this.props.item.product.id}
                  />
                </div>

                <div className="change__img__btn">
                  <button
                    onClick={() => toggleImg("DEC", this.props.item.product.id)}
                  >
                    ᐸ
                  </button>
                  <button
                    onClick={() => toggleImg("INC", this.props.item.product.id)}
                  >
                    ᐳ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currencyState: state.currency.currencyState,
    cart: state.cart.cart.cartItems,
  };
};

export default connect(mapStateToProps, {
  addToCart,
  removeFromCart,
  decreaseQuantity,
})(CartPageCard);
