import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import backend from './backend';
import "../css/singlePro.css"

const ProductDetail = () => {
  let { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Initialize quantity with 1

  useEffect(() => {
    // Make a GET request to fetch product details by ID
    axios.get(`${backend}/prodetails/${id}`)
      .then(response => {
        // Set the product state with the fetched data
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  }, [id]); // Add id as a dependency to rerun the effect when id changes

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity);
  };

  return (
    <div>
      {product ? (
        <div>
          <section className="section wrapper wrapper-section">
            <div className="container wrapper-column bor">
              <div className="wrapper-overlay">
                <img src={`http://localhost:9000/images/` + product.images} className="wrapper-image" alt="product" />
              </div>
              <div className="wrapper-content">
                <div className="wrapper-inform">
                  <span className="badge badge-darken">Product</span>
                  <h1 className="display-medium font-bold">{product.name}</h1>
                  {/* Display color code as small round */}
                  <p>Color :</p>
                  <div className="colorIn">
                    <div className="color-round" style={{ backgroundColor: product.color1 }}></div>
                    <div className="color-round" style={{ backgroundColor: product.color2 }}></div>
                  </div>
                </div>
                <div className="wrapper-detail">
                  <div className="price colorIn">
                    <span className="text-base font-medium">Price:</span>
                    <h3 className="text-large font-semi"> {product.price * quantity} TL</h3>
                  </div>
                  {/* Quantity selector */}
                  
                </div>
                <div className="quantity-selector">
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      min="1"
                      value={quantity}
                      onChange={handleQuantityChange}
                    />
                  </div>
                <div className="wrapper-action">
                  <button className="btn btn-darken">Add to Cart</button>
                </div>
              </div>
              <div className="desc">
            <h1>Products Details : </h1>
            <p dangerouslySetInnerHTML={{ __html: product.desc }}></p>
          </div>
            </div>
          </section>
          
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProductDetail;
