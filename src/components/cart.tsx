import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import {
  selectCart,
  selectShippingPrice,
  selectSubtotal,
  selectTaxes,
  selectTotal,
  selectTotalCouponsAmount,
} from "@store/app/selectors";
import { useDispatch } from "react-redux";
import {
  recalculateTaxesAsync,
  removeProductAsync,
  removeCouponAsync,
} from "@store/app/thunks";
import { ThunkDispatch } from "redux-thunk";
import { store } from "@store/store";
import { Action } from "redux";
import { StoreState } from "@store";
import AddCoupon from "./addCoupon";

interface CartProps {
  onClose?: () => void;
}
const Cart: React.FC<CartProps> = ({ onClose }) => {
  const thunkDispatch = store.dispatch as ThunkDispatch<
    StoreState,
    any,
    Action<any>
  >;

  const cart = useSelector(selectCart);
  const subtotal = useSelector(selectSubtotal);
  const shippingPrice = useSelector(selectShippingPrice);
  const taxes = useSelector(selectTaxes);
  const total = useSelector(selectTotal);
  const couponsAmount = useSelector(selectTotalCouponsAmount);

  // Assuming you have an array of image URLs corresponding to each product
  const imageUrls = [
    "/download.jpeg", // URL for Product 1
    "/download.jpeg", // URL for Product 2
    "/download.jpeg", // URL for Product 3
    "/download.jpeg", // URL for Product 4
    "/download.jpeg", // URL for Product 5
    "/download.jpeg", // URL for Product 6
    "/download.jpeg", // URL for Product 7
    "/download.jpeg", // URL for Product 8
    "/download.jpeg", // URL for Product 9
    "/download.jpeg", // URL for Product 10
    // Add more URLs as needed for other products
  ];

  return (
    <div
      className="popup-background"
      style={{
        background: "rgba(0, 0, 0, 0.5)", // Dark overlay background
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        className="popup-content"
        style={{
          background: "#222", // Darker gray background color for dark mode
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
          color: "#fff", // Light text color for dark mode
          maxWidth: "800px", // Limit width to avoid overflowing on small screens
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  backgroundColor: "#f2f2f2",
                  fontWeight: "bold",
                  padding: "10px",
                  textAlign: "left",
                  borderBottom: "1px solid #ccc",
                  color: "#222", // Dark text color for table header in dark theme
                }}
              >
                Image
              </th>
              <th
                style={{
                  backgroundColor: "#f2f2f2",
                  fontWeight: "bold",
                  padding: "10px",
                  textAlign: "left",
                  borderBottom: "1px solid #ccc",
                  color: "#222", // Dark text color for table header in dark theme
                }}
              >
                Product
              </th>
              <th
                style={{
                  backgroundColor: "#f2f2f2",
                  fontWeight: "bold",
                  padding: "10px",
                  textAlign: "left",
                  borderBottom: "1px solid #ccc",
                  color: "#222", // Dark text color for table header in dark theme
                }}
              >
                Prod ID
              </th>
              <th
                style={{
                  backgroundColor: "#f2f2f2",
                  fontWeight: "bold",
                  padding: "10px",
                  textAlign: "left",
                  borderBottom: "1px solid #ccc",
                  color: "#222", // Dark text color for table header in dark theme
                }}
              >
                Price
              </th>
              <th
                style={{
                  backgroundColor: "#f2f2f2",
                  fontWeight: "bold",
                  padding: "10px",
                  textAlign: "left",
                  borderBottom: "1px solid #ccc",
                  color: "#222", // Dark text color for table header in dark theme
                }}
              >
                Remove
              </th>
            </tr>
          </thead>
          <tbody>
            {(cart.products ?? []).map((p, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Image
                      src={imageUrls[index]}
                      alt={`Image of ${p.name}`}
                      width={50}
                      height={50}
                    />
                  </td>
                  <td>{p.name}</td>
                  <td>{p.id}</td>
                  <td>${p.price.toFixed(2)}</td>
                  <td>
                    <button
                      onClick={async () => {
                        await thunkDispatch(removeProductAsync()).unwrap();
                        await thunkDispatch(recalculateTaxesAsync());
                      }}
                      style={{
                        backgroundColor: "#f44336",
                        color: "#fff",
                        border: "none",
                        padding: "5px 10px",
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{ marginBottom: "20px" }}>
          <p>
            <strong>Coupons:</strong> -${couponsAmount}
          </p>
          <p>
            <strong>Shipping:</strong> ${shippingPrice}
          </p>
          <p>
            <strong>Taxes:</strong> ${taxes}
          </p>
          <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            <strong>Total:</strong> ${total}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {cart.coupons?.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "4px",
                  marginTop: "10px",
                }}
              >
                <p>{item.name}</p>
                <p>id: {index + 1}</p>
                <button
                  onClick={async () => {
                    await thunkDispatch(removeCouponAsync()).unwrap();
                  }}
                  style={{
                    backgroundColor: "#f44336",
                    color: "#fff",
                    border: "none",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                >
                  Remove Coupon
                </button>
              </div>
            );
          })}
        </div>
        <AddCoupon />
        <button
          className="close-button"
          onClick={onClose}
          style={{
            backgroundColor: "#4caf50",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Cart;
