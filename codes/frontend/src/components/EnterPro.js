import React, { useState } from 'react';
import axios from 'axios';
import backend from './backend';

const EnterProduct = () => {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState(null);
  const [color1, setColor1] = useState('');
  const [color2, setColor2] = useState('');
  const [price, setPrice] = useState('');
  const [country, setCountry] = useState('');

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFileChange = (event) => {
    setImages(event.target.files[0]);
  };
  
  const handleColorChange1 = (event) => {
    setColor1(event.target.value);
  };

  const handleColorChange2 = (event) => {
    setColor2(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('image', images);
    formData.append('color1', color1);
    formData.append('color2', color2);
    formData.append('price', price);
    formData.append('country', country);
  
    try {
      const response = await axios.post(backend + '/submit-product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Success:response.data', response.data);
      // Handle success response from backend
    } catch (error) {
      console.error('Error:error', error);
      // Handle error from backend
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={productName} onChange={handleProductNameChange} placeholder="Product Name" />
        <br />
        <select value={category} onChange={handleCategoryChange}>
          <option value="">Select Category</option>
          <option value="1">Karaca Home</option>
          <option value="2">Household Mess</option>
          <option value="3">Men Wear</option>
          <option value="4">Devices</option>
          <option value="5">Living</option>
        </select>
        <br />
        <textarea value={description} onChange={handleDescriptionChange} placeholder="Description"></textarea>
        <br />
        <input type="file" onChange={handleFileChange}/>
        <br />
        <input type="color" value={color1} onChange={handleColorChange1} />
        <input type="color" value={color2} onChange={handleColorChange2} />
        <br />
        <input type="number" value={price} onChange={handlePriceChange} placeholder="Price" />
        <br />
        <input type="text" value={country} onChange={handleCountryChange} placeholder="Country Name" />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EnterProduct;
