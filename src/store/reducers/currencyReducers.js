import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    currencyState:"",
    currencySymbol:"",
}

export const currencyReducer = createSlice({
    name:"currencyState",
    initialState,
    reducers:{
        toggleCurrency:(state,action)=>{
            let temp = action.payload.split('+')
            console.log(temp)
            state.currencyState = temp[0]
            state.currencySymbol = temp[1]
        }
    }

})


export const {toggleCurrency} = currencyReducer.actions;

export default currencyReducer.reducer;