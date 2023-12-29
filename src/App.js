// src/App.js
import React, { useState, useEffect } from "react";
import Product from "./Product";
import "./style.css";

const App = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Kitaplık", price: 10, quantity: 0 },
    { id: 2, name: "Ayakkabı", price: 20, quantity: 0 },
    { id: 3, name: "Çanta", price: 30, quantity: 0 },
    
  ]);

  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    const newTotalPrice = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalPrice(newTotalPrice);
  }, [cart]);

  const addToCart = (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );

    const selectedProduct = updatedProducts.find(
      (product) => product.id === productId
    );

    setProducts(updatedProducts);
    const existingCartItem = cart.find((item) => item.id === productId);

    if (existingCartItem) {
      const updatedCart = cart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...selectedProduct }]);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
    );

    const updatedProducts = products.map((product) =>
      product.id === productId
        ? { ...product, quantity: Math.max(0, product.quantity - 1) }
        : product
    );

    setCart(updatedCart.filter((item) => item.quantity > 0));
    setProducts(updatedProducts);
  };

  const removeProduct = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, quantity: 0 } : product
    );

    setCart(updatedCart);
    setProducts(updatedProducts);
  };

  const addNewProduct = () => {
    const productName = prompt("Yeni ürünün adını giriniz:");
    const productPrice = parseFloat(prompt("Yeni ürünün fiyatını giriniz:"));

    if (productName && !isNaN(productPrice)) {
      const newProduct = {
        id: products.length + 1,
        name: productName,
        price: productPrice,
        quantity: 1,
      };

      setProducts([...products, newProduct]);
    } else {
      alert("Geçersiz giriş. Lütfen geçerli bir isim ve fiyat giriniz.");
    }
  };

  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const chunkedProducts = chunkArray(products, 2);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">E-Ticaret Uygulaması</h1>
      {chunkedProducts.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((product, colIndex) => (
            <div key={colIndex} className="col-md-6 mt-4">
              <Product
                product={product}
                onAddToCart={addToCart}
                onRemoveFromCart={removeFromCart}
                onRemoveProduct={removeProduct}
              />
            </div>
          ))}
        </div>
      ))}
      <div className="text-center mt-4">
        <button className="btn btn-success mb-3" onClick={addNewProduct}>
          Yeni Ürün Ekle
        </button>
      </div>
      <div className="text-center mt-4">
        <h2>Sepet</h2>
        <p className="total-price">
          Toplam Fiyat: ${totalPrice.toFixed(2)}
        </p>
        {cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.id} className="d-inline-block mx-2">
              <p>
                {item.name} - Miktar: {item.quantity} - Toplam: ${item.price * item.quantity}
                <button
                  className="btn btn-danger ml-2"
                  onClick={() => removeProduct(item.id)}
                >
                  Ürünü Kaldır
                </button>
              </p>
            </div>
          ))
        ) : (
          <p>Sepetinizde ürün bulunmamaktadır.</p>
        )}
      </div>
    </div>
  );
};

export default App;
