import React, { Component } from "react";
import { Navbar, Loader } from "./components";
import { ProductListing,ProductDetail,CartPage } from "./pages";
import { Routes, Route, Navigate } from "react-router-dom";
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      loading: true,
    };
  }

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
