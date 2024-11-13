import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { NavLink } from "react-router-dom";
import HomeHeader from "../components/HomeHeader";
import Seo from "../components/Seo";

const Cart = () => {
  const { cart, updateCart, removeFromCart } = useContext(CartContext);

  const handleIncrement = (item) => {
    updateCart(item.id, item.quantity + 1);
  };

  const handleDecrement =(item) => {
    if (item.quantity > 1) {
        updateCart(item.id, item.quantity - 1);
    } else {
        removeFromCart(item.id);
    }
  };

  return (
    <div>
        <Seo
            title="Donate"
            description="Learn how you can support us."
        />
      <HomeHeader desc="" title="Support us" image_url="/header-bg-imgs/older-couple.jpg" btn="Learn more about hospice" btnLink="/"/>
        {cart.length === 0 ? (
            <div className="single-post donate-post">
                <p>You havent selected an option</p>
                <button className="primary-button">
                    <NavLink to='/shop'>Start browsing options</NavLink>
                </button>
            </div>
        ) : (
            <ul className="donation-cart">
                {cart.map((item) => (
                    <li key={item.id} className="donation-item">
                        <h2>{item.name}</h2>
                        <div className="product-content-container">
                            <div className="product-content">
                                <p>Price: ${parseFloat(item.prices.price / 100).toFixed(2)}</p>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                            <div className="product-content">
                                <button className="primary-button" onClick={() => handleDecrement(item)}>-</button>
                                <button className="primary-button" onClick={() => handleIncrement(item)}>+</button>
                                <button className="primary-button" onClick={() => removeFromCart(item.id)}>Remove</button>
                            </div>
                        </div>
                    </li>
                ))}
                <button className="primary-button">Proceed to Checkout</button>
            </ul>
        )}
    </div>
  );
};

export default Cart;
