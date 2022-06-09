import React, { Component } from 'react'
import "./CartCard.scss";
import { connect } from 'react-redux'
import { addToCart,removeFromCart,decreaseQuantity } from '../../store/reducers/cartReducer'
export class CartCard extends Component {

  constructor(props){
    super(props);
    this.state ={
      loading:true,
      
    }
  }

  

  componentDidMount(){
    
    this.setState({
      
      loading:false,
    })
  }
  
  render(){

    // const handleVariation = (e)=>{
    //   let type = e.target.name;
    //   let value = e.target.value;

     

    //   let index = this.state.selected_variation.findIndex((x)=>{

    //     return x.type === type
    //   })
 
    //   if(index === -1){
        
    //     this.setState({
    //       selected_variation: [...this.state.selected_variation, {type,value}]
    //     })
    //   }else{

    //     const newData = [...this.state.selected_variation]
    //     newData[index].value = value
    //     this.setState({
    //       selected_variation:newData,
    //     })
    //     // need to update the state
    //   }
      
    // }
    const handleVariation = () =>{
      console.log("handle variation")
    }
    const add_cart = ()=>{
      this.props.addToCart(this.props.item);
    }
    const remove_cart = ()=>{
      this.props.decreaseQuantity(this.props.item);
    }


    if(this.state.loading === true){
      return <h1>LOADING....</h1>
    }else{
      return (
        <div className="main__box">
          <div>
            <div className="product__title">
              <p>{this.props.item.product.name}</p>
            </div>
            <div className="product__price__card">
              <p>{(this.props.item.product.prices.find((e) => e.currency.label === this.props.currencyState)).currency.symbol } {(this.props.item.product.prices.find((e) => e.currency.label === this.props.currencyState)).amount }</p>
            </div>
            <div className='product__attribute__overlay'>
              {this.props.item.product.attributes.map((x, i, orignalArr) => (
                  <div key={i}>
                    {x.id === "Color" ? (
                      <div key={i}>
                        <p className="attribute__title">{x.name} :</p>
                        <div className="mapping__div">
                          {x.items.map((y, j) => (
                            <div key={j} >
                              {/* {x.id===this.props.item.variation[i].type ? <div>yes</div>:<div>not</div>} */}
                              {/* {console.log(this.props.item.variation[i].value)}
                              {console.log(y.value)} */}
                              {this.props.item.variation[i].value === y.value ? <div
                                className="variation__color__box"
                                style={{ backgroundColor: `${y.value}` }}
                              >
                                <input
                                  type="radio"
                                  name={`${x.id}${this.props.index}`}
                                  id={`${x.id}${this.props.index}${j}`}
                                  className="hidebx"
                                  value={y.value}
                                  onChange={(e)=>{handleVariation(e)}}
                                  checked
                                  disabled
                                />
                                <label htmlFor={`${x.id}${this.props.index}${j}`} className="lbl-radio">
                                  <div className="display-box">{/* 32GB */}</div>
                                  {}
                                </label>
                              </div>:<div
                                className="variation__color__box"
                                style={{ backgroundColor: `${y.value}` }}
                              >
                                <input
                                  type="radio"
                                  name={`${x.id}${this.props.index}`}
                                  id={`${x.id}${this.props.index}${j}`}
                                  className="hidebx"
                                  value={y.value}
                                  onChange={(e)=>{handleVariation(e)}}
                                  disabled
                                  
                                />
                                <label htmlFor={`${x.id}${this.props.index}${j}`} className="lbl-radio">
                                  <div className="display-box">{/* 32GB */}</div>
                                  {}
                                </label>
                              </div> }
                              
                              
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div key={i} style={{maxWidth:"117px",margin:"15px 0px"}}>
                        <p className="attribute__title">{x.name} :</p>
                        <div className="mapping__div">
                          {x.items.map((y, j) => (
                            <div key={j} >
                              
                              {this.props.item.variation[i].value === y.value ? <div className="variation__box__cartcard">
                                <input
                                  type="radio"
                                  name={`${x.id}${this.props.index}`}
                                  id={`${x.id}${this.props.index}${j}`}
                                  className="hidebx"
                                  value={y.value}
                                  onChange={(e)=>{handleVariation(e)}}
                                  checked
                                  disabled
                                />
                                <label
                                  htmlFor={`${x.id}${this.props.index}${j}`}
                                  className="lbl-radio"
                                >
                                  <div className="display-box">{y.value}</div>
                                </label>
                              </div>:<div className="variation__box__cartcard">
                                <input
                                  type="radio"
                                  name={`${x.id}${this.props.index}`}
                                  id={`${x.id}${this.props.index}${j}`}
                                  className="hidebx"
                                  value={y.value}
                                  onChange={(e)=>{handleVariation(e)}}
                                  disabled
                                />
                                <label
                                  htmlFor={`${x.id}${this.props.index}${j}`}
                                  className="lbl-radio"
                                >
                                  <div className="display-box">{y.value}</div>
                                </label>
                              </div> }
                              
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

            </div>
          </div>
          <div className="action__box">
            <div>
              <button onClick={()=>{add_cart()}}>+</button>
            </div>
            <div>
              {this.props.item.quantity}
            </div>
            <div>
              <button onClick={()=>{remove_cart()}}>-</button>
            </div>
          </div>
          <div >
            <img src={this.props.item.product.gallery[0]} alt="" className="prod__img"/>
          </div>
        </div>
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


export default connect(mapStateToProps,{addToCart,removeFromCart,decreaseQuantity}) (CartCard);