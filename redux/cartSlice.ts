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
}

const initialState: IcartSlice = {
  cartData: [],
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
  },
});

export const { setAddToCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
