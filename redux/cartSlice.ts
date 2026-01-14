import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import mongoose from "mongoose";

interface Igrocery {
  _id?: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  image?: string;
  quantity: number;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IcartSlice {
  cartData: Igrocery[];
  subTotal:number,
  deliveryFee:number,
  finalTotal:number,
}

const initialState: IcartSlice = {
  cartData: [],
  subTotal:0,
  deliveryFee:40,
  finalTotal:40,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setAddToCart: (state, action: PayloadAction<Igrocery>) => {
      state.cartData.push(action.payload);
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cartData.find((i) => i._id == action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cartData.find((i) => i._id == action.payload);
      if (item?.quantity && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cartData = state.cartData.filter((i) => i._id !== action.payload);
      }
    },
    removeFromCart:(state,action: PayloadAction<string>)=>{
      state.cartData=state.cartData.filter(i=>i._id!==action.payload)
    },
    calculateTotal:(state)=>{
      state.subTotal=state.cartData.reduce((sum,item)=>sum +Number(item.price*item.quantity),0)
      state.deliveryFee=state.subTotal>100?0:40,
      state.finalTotal=state.subTotal+state.deliveryFee
    }

  },
});

export const { setAddToCart, increaseQuantity, decreaseQuantity ,removeFromCart} =
  cartSlice.actions;
export default cartSlice.reducer;
