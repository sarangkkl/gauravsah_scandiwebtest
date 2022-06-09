import React, { Component } from "react";
import "./ProductDetail.scss";
import { Loader } from "../../components";
import Parser from "html-react-parser";

import { connect } from "react-redux";
import { addToCart } from "../../store/reducers/cartReducer";
export class ProductDetail extends Component {
  constructor() {
    super();
    this.state = {
      product: {},
      loading: true,
      imgUrl: "",
      selected_variation: [],
      quantity: 1,
    };
  }
  componentDidMount() {
    const currentUrl = window.location.pathname;
    const id = currentUrl.replace("/", "");
    // console.log("The id is", id);
    const query = `
    query ($productId: String!) {
      product(id:$productId) {
        id,
        name,
        inStock,
        gallery,
        description,
        category,
        attributes{
          id,
          name,
          type,
          items{
            displayValue,
            value,
            id,
          }
        },prices {
          amount,
          currency {
            label,
            symbol
          }
        },brand
    
      } 
  }
  
    `;
    fetch("http://localhost:4000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          productId: id,
        },
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          product: data.data.product,
          loading: false,
        });

        // console.log("The data i am getting is", data.data.product);
        // {console.log(this.state.product)}
      });
  }
  render() {
    // Function that is handling the change of the image
    const handleImageChange = (value) => {
      var x = document.getElementById("main__img");
      x.src = value;
    };
    const handleAddToCart = () => {
      
      const order = this.state.product.attributes.map((attribute) =>
        this.state.selected_variation.find((v) => v.type === attribute.id)
      );

      const data = {
        variation: order,
        product: this.state.product,
        quantity: this.state.quantity,
      };
      if (
        this.state.selected_variation.length ===
        this.state.product.attributes.length
      ) {
        this.props.addToCart(data);
        this.setState({
          selected_variation: []
        })
    

      } else {
        alert("Please Select all the variations");
      }
    };

    const handleVariation = (e)=>{
      let type = e.target.name;
      let value = e.target.value;
      let index = this.state.selected_variation.findIndex((x)=>{
        return x.type === type
      })
 
      if(index === -1){
        
        this.setState({
          selected_variation: [...this.state.selected_variation, {type,value}]
        })
      }else{

        const newData = [...this.state.selected_variation]
        newData[index].value = value
        this.setState({
          selected_variation:newData,
        })
        // need to update the state
      }
      
    }
    if (this.state.loading === true) {
      return <Loader />;
    } else {
      return (
        <div className="product__detail__box">
          <div className="product__img">
            {this.state.product.gallery.map((item, index) => (
              <div key={index}>
                <img
                  src={item}
                  alt={this.state.product.name}
                  onClick={(e) => {
                    handleImageChange(e.target.src);
                  }}
                />
              </div>
            ))}
          </div>
          <div className="main__product__img">
            <img
              src={this.state.product.gallery[0]}
              alt={this.state.product.name}
              id="main__img"
            />
          </div>
          <div className="product__info__data">
            <p>
              <span className="product__title">
                {this.state.product.name.split(" ")[0]} <br />
              </span>{" "}
              <span className="product__rest__title">
                {this.state.product.name.split(" ").slice(1).join(" ")}
              </span>
            </p>
            <div className="product__attributes">
              {this.state.product.attributes.map((x, i, orignalArr) => (
                <div key={i}>
                  {x.id === "Color" ? (
                    <div key={i}>
                      <p className="attribute__title">{x.name} :</p>
                      <div className="mapping__div">
                        {x.items.map((y, j) => (
                          <div key={j}>
                            <div
                              className="variation__color__box"
                              style={{ backgroundColor: `${y.value}` }}
                            >
                              <input
                                type="radio"
                                name={x.id}
                                id={j}
                                className="hidebx"
                                value={y.value}
                                onChange={(e)=>{handleVariation(e)}}
                              />
                              <label htmlFor={j} className="lbl-radio">
                                <div className="display-box">{/* 32GB */}</div>
                                {}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div key={i}>
                      <p className="attribute__title">{x.name} :</p>
                      <div className="mapping__div">
                        {x.items.map((y, j) => (
                          <div key={j}>
                            <div className="variation__box">
                              <input
                                type="radio"
                                name={orignalArr[i].name}
                                id={`${orignalArr[i].name}${j}`}
                                className="hidebx"
                                onChange={(e)=>{handleVariation(e)}}
                                value={y.value}
                              />
                              <label
                                htmlFor={`${orignalArr[i].name}${j}`}
                                className="lbl-radio"
                              >
                                <div className="display-box">{y.value}</div>
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="product__price">
              <p>PRICE:</p>
              <p>
                {
                  this.state.product.prices.find(
                    (e) => e.currency.label === this.props.currencyState
                  ).currency.symbol
                }{" "}
                {
                  this.state.product.prices.find(
                    (e) => e.currency.label === this.props.currencyState
                  ).amount
                }
              </p>
            </div>
            {this.state.product.inStock ? <button className="btn" onClick={()=>{handleAddToCart()}}>ADD TO CART</button>:<button className="btn" disabled>OUT OF STOCK</button>}
            <div className="product__description">
              {Parser(this.state.product.description)}
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
  };
};

export default connect(mapStateToProps, {addToCart})(ProductDetail);
