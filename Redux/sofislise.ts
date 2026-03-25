import { ProductTyps } from "@/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  cart: ProductTyps[];
  favorate: ProductTyps[];
  userInfo: any,
}

const initialState: InitialState = {
  cart: [],
  favorate: [],
  userInfo: null
}

export const sofislice = createSlice({
  name: "Sofislice",
  initialState,
  reducers: {
    addtocart: (state, action: PayloadAction<ProductTyps>) => {
      const existingProduct = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 0) + 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
increasesQuantity:(state,action)=>{
    const existingProduct = state.cart.find(
        (item) => item._id === action.payload
      );
        if (existingProduct) {
        existingProduct.quantity!+=1
      } 

},
decreaseQuantity:(state,action)=>{
    const existingProduct = state.cart.find(
        (item) => item._id === action.payload
      );
        if (existingProduct) {
        existingProduct.quantity!-=1
      } 

},
  }
})

export const { addtocart,increasesQuantity, decreaseQuantity} = sofislice.actions;
export default sofislice.reducer;