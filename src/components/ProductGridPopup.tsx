// components/ProductGridPopup.tsx
import React from "react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  imageURL: string;
}

interface ProductGridPopupProps {
  addToCart: (product: Product) => void;
  onClose: () => void;
  products: any;
}

const ProductGridPopup: React.FC<ProductGridPopupProps> = ({
  addToCart,
  onClose,
  products,
}) => {
  // Dummy products
  const dummyProducts: Product[] = [
    {
      id: "ID: 169048",
      name: "Product 1",
      price: 65.0,
      imageURL: "/download.jpeg",
    },
    {
      id: "ID: 164904",
      name: "Product 2",
      price: 56.0,
      imageURL: "/download.jpeg",
    },
    {
      id: "ID: 34423",
      name: "Product 3",
      price: 120.99,
      imageURL: "/download.jpeg",
    },
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(0, 0, 0, 0.5)",
        zIndex: 999,
      }}
    >
      <div
        style={{
          background: "#222", // Darker gray background color for dark mode
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
          color: "#fff", // Light text color for dark mode
        }}
      >
        <h2 style={{ textAlign: "center" }}>Available Products</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          {dummyProducts.map((product) => (
            <div
              key={product.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "8px",
                padding: "10px",
                border: "1px solid #ccc",
              }}
            >
              <div
                style={{
                  width: "200px",
                  height: "150px",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={product.imageURL}
                  alt={`Image of ${product.name}`}
                  width={200}
                  height={150}
                  objectFit="cover"
                />
              </div>
              <h3>{product.name}</h3>
              <h3>{product.id}</h3>
              <p>${product.price.toFixed(2)}</p>
              <button
                style={{
                  background: "#007bff",
                  color: "#fff",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <button
          style={{
            background: "#f44336",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "20px",
            width: "100%",
          }}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProductGridPopup;
