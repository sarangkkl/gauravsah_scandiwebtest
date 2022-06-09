import React, { Component } from 'react';
import { Loader } from '../../components';
import "./ProductListing.scss";
import { ProductCard } from '../../components';



export class ProductListing extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      products:[],
      categoryId:"",
    }
  }

  componentDidMount (){
    const currentUrl = window.location.pathname;
    const id = currentUrl.replace("/", "");
    this.setState({categoryId:id})
    
    const query = `
    query{
      categories {
          name
          products {
            id,
            name,
            brand,
            inStock,
            gallery,
            category,
            prices {
                amount,
                currency {
                  label,
                  symbol
                }
              }
          }
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
        
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          products: data.data,
          loading: false,
        });
      });
      
  }

  

  render()
  {
    if(this.state.loading===true){
      return <Loader />
    }else{
      return (
        <div>
            <h2 className='page__listing__title'>{this.state.categoryId[0].toUpperCase()+this.state.categoryId.substring(1)}</h2>
          <div className='productlisting__page'>
            {this.state.products.categories.map((item,index)=>(
              <div key={index} >
                {item.name === this.state.categoryId ? <div className="product__listing__card">
                  {item.products.map((product,i)=>(
                    <ProductCard product={product} key={i}/>
                  ))}

                </div>:""}

                
              </div>
            ))}
            
          </div>

        </div>
      )

    }
  }
}

export default ProductListing