import { createSelector } from "@reduxjs/toolkit";
import { selectRootState } from "..";

// QUESTION: Why are we using createSelector here? What is the advantage over
// plain functions?

// ==================> ANSWER 👇👇
//createSelector is used to create memoized selectors in Redux. The advantage of using createSelector over plain functions is that it optimizes the performance of selecting data from the Redux store. Memoization is a technique that caches the result of a function based on its arguments and returns the cached result when the same arguments are provided again. This helps to avoid unnecessary recalculations when the same selector is used multiple times with the same input.
// In our case, multiple selectors are created using createSelector to derive data from the Redux store state (selectRootState). Each selector depends on one or more other selectors or raw state data, and createSelector ensures that the computation is only performed when the input data changes.
// ==================> ANSWER END HERE

export const selectAppRootState = createSelector(
  selectRootState,
  (state) => state.app
);

export const selectIsCartLoading = createSelector(
  selectAppRootState,
  (state) => state.isCartLoading
);

export const selectCart = createSelector(selectAppRootState, (app) => app.cart);

export const selectSubtotal = createSelector(
  selectCart,
  (cart) => cart.products?.reduce((subTotal, p) => subTotal + p.price, 0) ?? 0
);

export const selectShippingPrice = createSelector(
  selectCart,
  (cart) => cart.shippingPrice ?? 0
);

export const selectTaxes = createSelector(
  selectCart,
  (cart) => cart.taxes ?? 0
);

export const selectTotalCouponsAmount = createSelector(
  selectCart,
  (cart) => cart.coupons?.reduce((subTotal, p) => subTotal + p.discount, 0) ?? 0
);

export const selectTotal = createSelector(
  selectSubtotal,
  selectShippingPrice,
  selectTaxes,
  selectTotalCouponsAmount,
  (subTotal, shippingPrice, taxes, totalCouponsAmount) => {
    const totalCost = subTotal + shippingPrice + taxes - totalCouponsAmount;
    const minTotal = subTotal / 2; // Minimum total allowed is half of the subtotal

    // Check if the calculated total is below the minimum allowed
    if (totalCost < minTotal) {
      const errorMessage = `The total cannot go below half the total cost of the products ($${minTotal}).`;
      // You can show the error message to the user here, for example using an alert or some other UI component.
      // For simplicity, let's just log the error message to the console in this example.
      console.error(errorMessage);

      // Return the minimum allowed total as the final value
      return minTotal.toFixed(3);
    }

    // If the total is within the allowed range, return the calculated total
    return totalCost.toFixed(3);
  }
);
