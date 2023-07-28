import Image from "next/image";
import "./globals.css";
import styles from "@pages/page.module.css";
import { addProductAsync } from "@store/app/thunks";
import { recalculateShippingAsync } from "@store/app/thunks";
import { recalculateTaxesAsync } from "@store/app/thunks";
import { Inter } from "@next/font/google";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });
import { store } from "@store/store";
import { Provider } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { StoreState } from "@store";
import { Action } from "redux";
import { useEffect, useState } from "react";

import { selectIsCartLoading } from "@store/app/selectors";
import ProductGridPopup from "../components/ProductGridPopup";

import AddCoupon from "@components/addCoupon";
import Cart from "@components/cart";

const App = ({ Component }: { Component: React.ComponentType }) => {
  const [showGridPopup, setShowGridPopup] = useState(false);
  const [products, setProducts] = useState<any>([]); // Updated state to hold the products in the cart
  const [cartPopupMessage, setCartPopupMessage] = useState("");
  const [showCart, setShowCart] = useState(false);

  const handleAddToCart = async (product: any) => {
    // Show the cart popup with the initial message
    toast.info("Product is being added...", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
    });

    try {
      // Simulate an asynchronous operation to add the product to the cart
      await thunkDispatch(addProductAsync(product)).unwrap();
      await thunkDispatch(recalculateShippingAsync());
      await thunkDispatch(recalculateTaxesAsync());

      // Update the state with the newly added product
      setProducts((prevProducts: any) => [...prevProducts, product]);

      // Show the toast to indicate the product has been added
      toast.success("Product has been added!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
      });
    } catch (error) {
      // Handle any errors that might occur during the asynchronous operations
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product to cart.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
  };

  // const toggleCartPopup = () => {
  //   setShowCartPopup((prevShowCartPopup) => !prevShowCartPopup); // Toggle the cart popup state
  // };

  const thunkDispatch = store.dispatch as ThunkDispatch<
    StoreState,
    any,
    Action<any>
  >;

  const [cartIsLoading, setCartIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      const cartLoading = selectIsCartLoading(state);
      setCartIsLoading(cartLoading);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Provider store={store}>
      <main className={styles.main}>
        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/logo.svg"
            alt="Sharper Image Logo"
            width={360}
            height={74}
            priority
          />
        </div>

        <Component />

        <div
          className={styles.grid}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            className={styles.card}
            onClick={() => setShowGridPopup(true)}
            style={{ flex: 1, margin: "0 10px", maxWidth: "200px" }}
          >
            <h2 style={{ textAlign: "center" }}>
              Add product <span>(+)</span>
            </h2>
            <p style={{ textAlign: "center" }}>
              Add different products to cart for purchase and checkout
            </p>
          </button>
          s{/* Show the grid popup when 'showGridPopup' is true */}
          {showGridPopup && (
            <ProductGridPopup
              products={products}
              addToCart={handleAddToCart}
              onClose={() => setShowGridPopup(false)}
            />
          )}
          <button
            onClick={() => setShowCart(true)}
            className={styles.card}
            style={{ flex: 1, margin: "0 10px", maxWidth: "200px" }}
          >
            <div className={inter.className} style={{ textAlign: "center" }}>
              View cart <span>-&gt;</span>
            </div>
            <p className={inter.className} style={{ textAlign: "center" }}>
              See the items that have been added to your cart.
            </p>
          </button>
        </div>

        {/* ToastContainer for displaying toasts */}
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
        {showCart && <Cart onClose={() => setShowCart(false)}></Cart>}
        <AddCoupon />
      </main>
    </Provider>
  );
};

export default App;
