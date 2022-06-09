

export const MakeQuery = (query,variables) =>{
  let response;
    fetch("http://localhost:4000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // this.setState({
        //   product: data.data.product,
        //   loading: false,
        // });
        response = data;
        
        
        // console.log("The data i am getting is", data.data.categories);
        // {console.log(this.state.product)}
      });
      console.log(response);
      return response;
}