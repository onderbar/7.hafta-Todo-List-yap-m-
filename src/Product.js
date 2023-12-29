// src/Product.js
import React from "react";

const Product = ({ product, onAddToCart, onRemoveFromCart, onRemoveProduct }) => {
  return (
    <div className="product-container">
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <p>Quantity: {product.quantity}</p>
      <button className="add-to-cart btn btn-success" onClick={() => onAddToCart(product.id)}>
        Sepete Ekle
      </button>
     
      
      <button className="remove-product btn btn-danger" onClick={() => onRemoveProduct(product.id)}>
        Ürünü Kaldır
      </button>
    </div>
  );
};

export default Product;
