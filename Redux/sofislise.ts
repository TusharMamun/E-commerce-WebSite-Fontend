import { ProductTyps } from "@/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

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
removeFormCard:(state,action)=>{
  state.cart =state.cart.filter((item)=>item?._id !==action.payload)
},
resetCart:(state)=>{
  state.cart=[]
},
addTofavorate: (state, action) => {
      const existingFavorateItem = state.favorate.find(
        (item) => item._id === action.payload._id
      );
      
      if (existingFavorateItem) {
        // Remove if already in favorites
        state.favorate = state.favorate.filter(
          (item) => item._id !== action.payload._id
        );
      } else {
        // Add if not in favorites
        state.favorate.push(action.payload);
      }
    },
    resetFavorate: (state) => {
      state.favorate = [];
    }
  },

})

export const { addtocart,increasesQuantity, decreaseQuantity,removeFormCard,resetCart,resetFavorate,addTofavorate,} = sofislice.actions;
export default sofislice.reducer;