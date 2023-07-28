"use client";

import { selectCart } from "@store/app/selectors";
import { addCouponAsync } from "@store/app/thunks";
import { recalculateShippingAsync } from "@store/app/thunks";
import { recalculateTaxesAsync } from "@store/app/thunks";
import { store } from "@store/store";
import { StoreState } from "@store";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import Cart from "./cart";
import { useSelector } from "react-redux";

const AddCoupon = () => {
  const thunkDispatch = store.dispatch as ThunkDispatch<
    StoreState,
    any,
    Action<any>
  >;

  const cart = useSelector(selectCart);

  return (
    <>
      <button
        disabled={cart.coupons?.length === 3}
        style={{ marginTop: "10px" }}
        onClick={async () => {
          await thunkDispatch(addCouponAsync()).unwrap();
          await thunkDispatch(recalculateShippingAsync());
          await thunkDispatch(recalculateTaxesAsync());
        }}
      >
        Add Coupon
      </button>
    </>
  );
};

export default AddCoupon;
