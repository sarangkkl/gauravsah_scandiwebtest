import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    cart: {
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      
    },
  };

export const cartReducer = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const tempitem = action.payload;
            
            let isExist = state.cart.cartItems.findIndex((x)=>{
                return x.product.id === tempitem.product.id
              })
            if(isExist === -1){
                state.cart.cartItems.push(tempitem);
                localStorage.setItem("cartItems", JSON.stringify(state.cart.cartItems));
            }else{
                state.cart.cartItems[isExist].quantity += 1;
                state.cart.cartItems[isExist].variation = tempitem.variation;
                
                
                localStorage.setItem("cartItems", JSON.stringify(state.cart.cartItems));
            }
            // state.cart.cartItems.push(action.payload);
            // localStorage.setItem("cartItems", JSON.stringify(state.cart.cartItems));
        },
        removeFromCart: (state, action) => {
            state.cart.cartItems.splice(action.payload, 1);
            localStorage.setItem("cartItems", JSON.stringify(state.cart.cartItems));
        },
        decreaseQuantity: (state, action) => {
            const tempitem = action.payload;
            
            let isExist = state.cart.cartItems.findIndex((x)=>{
                return x.product.id === tempitem.product.id
              })
            console.log(state.cart.cartItems[isExist].quantity)
            if(state.cart.cartItems[isExist].quantity > 1){
                state.cart.cartItems[isExist].quantity -= 1;

            }else{
                state.cart.cartItems.splice(isExist, 1);
            }
            
            localStorage.setItem("cartItems", JSON.stringify(state.cart.cartItems));
        },getTotalPrice: (state, action) => {
            
            console.log(state.cart.cartItems);
            // return total;
        }
    }
})

export const {addToCart,removeFromCart,decreaseQuantity,getTotalPrice} = cartReducer.actions;

export default cartReducer.reducer;