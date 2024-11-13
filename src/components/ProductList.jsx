import { useContext, useEffect, useState } from "react";
import wooCommerceApi from "../woocommerceApi";
import { CartContext } from "../context/CartContext";
import HomeHeader from "./HomeHeader";
import Seo from "./Seo";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await wooCommerceApi.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product); // add product to cart
  };

  
  if (loading) {
    return <>
        <section className="dots-container">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </section>
    </>
}

  return (
    <>
      <Seo
        title="Support us"
        description="Support us through donations."
      />

      <HomeHeader desc="" title="Support us" btn="Learn more about hospice" btnLink="/"/>
      <div className="populated-posts">
        <ul className="product-items">
          {products.map((product) => (
            <li key={product.id} className="product-item">
              <h2>{product.name}</h2>

              {/* Display product image */}
              {product.images && product.images.length > 0 && (
                <img
                  src={product.images[0].src}
                  alt={product.images[0].alt || product.name}
                  style={{ width: '150px', height: '150px' }}
                />
              )}

              {/* Display Price */}
              <p>Price: ${(product.prices.price / 100).toFixed(2)}</p>

              <button className="primary-button" onClick={() => handleAddToCart(product)}>Add to Cart</button>

            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ProductList;
