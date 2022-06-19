import React, { Component } from "react";
import { Navbar, Loader } from "./components";
import { ProductListing,ProductDetail,CartPage } from "./pages";
import { Routes, Route, Navigate } from "react-router-dom";
export class App extends Component {
  constructor(props) {
    super(props);
    // Here I will query all the categories and store them in the category array and after that 
    // i will set the state of loading to false

    // I am mapping the categories to create the LINKS OF The Categories Route like below
    // {this.state.categories.categories.map((item, index) => (
    //   <Route exact path={`${item.name}`}  element={<ProductListing  key={`${index}`}/>}  key={index}/>
    // ))}

    this.state = {
      categories: [],
      loading: true,
    };
  }

  // This function only fetching the data and updating the state
  
  componentDidMount() {
    const query = `
    query Query {
      categories {
        name
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
          categories: data.data,
          loading: false,
        });
      });
  }

  render() {
    if (this.state.loading === true) {
      return <Loader />;
    } else {
      return (
        <>
          <Navbar />

          <Routes>
            <Route path="/" element={<Navigate replace to="/all" />} />
            {this.state.categories.categories.map((item, index) => (
              <Route exact path={`${item.name}`}  element={<ProductListing  key={`${index}`}/>}  key={index}/>
            ))}
            <Route path="/cart" element={<CartPage />} />
            <Route path="/:id" element={<ProductDetail />} />
          </Routes>
        </>
      );
    }
  }
}

export default App;
