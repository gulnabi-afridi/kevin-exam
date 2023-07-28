import { Cart } from "@/models/cart";
import { ActionCreatorWithPayload, createSlice } from "@reduxjs/toolkit";
import {
  addCouponAsync,
  addProductAsync,
  recalculateShippingAsync,
  recalculateTaxesAsync,
  removeProductAsync,
  removeCouponAsync,
} from "./thunks";

export interface AppState {
  isCartLoading: boolean;
  cart: Cart;
}

export const appSlice = createSlice({
  name: "app",
  initialState: {
    isCartLoading: false,
    cart: {} as Cart,
  },
  reducers: {
    setCart: (state, { payload }: { payload: Cart }) => {
      return {
        ...state,
        cart: payload,
      };
    },
  },
  extraReducers: (builder) => {
    [
      addProductAsync,
      addCouponAsync,
      recalculateShippingAsync,
      recalculateTaxesAsync,
      removeProductAsync,
      removeCouponAsync,
    ].forEach((thunk) => {
      builder.addCase(thunk.pending, (state) => {
        state.isCartLoading = true;
      });

      builder.addCase(thunk.fulfilled, (state, action) => {
        state.cart = action.payload;
      });

      builder.addCase(thunk.rejected, (_state, action) => {
        console.error(action.error);
      });
    });
  },
});

export const { setCart } = appSlice.actions as {
  setCart: ActionCreatorWithPayload<Cart, string>;
};
