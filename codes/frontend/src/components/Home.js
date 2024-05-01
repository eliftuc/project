import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import img1 from "../img/Screenshot 2024-04-30 201034.png";

import img2 from "../img/Screenshot 2024-04-30 201102.png";
import img3 from "../img/Screenshot 2024-04-30 201117.png";
import img4 from "../img/Screenshot 2024-04-30 201130.png";
import img5 from "../img/Screenshot 2024-04-30 201212.png";
import "../css/first.css";
import "../css/main.css";
import im1 from "../img/format_webp.jpeg";
import im2 from "../img/format_webp (4).jpeg";
import im3 from "../img/format_webp (3).jpeg";
import im4 from "../img/format_webp (2).jpeg";
import backend from './backend';
import axios from 'axios';



const Home = () => {

  const [data, setData] = useState([]);
  const [Category1, setCategory1] = useState([]);
  const [Category2, setCategory2] = useState([]);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const restaurantContainer = document.querySelector(".card-slider");
    setContainerWidth(restaurantContainer.offsetWidth);

    const handleScroll = () => {
      setScrollPosition(restaurantContainer.scrollLeft);
    };

    restaurantContainer.addEventListener("scroll", handleScroll);

    return () => {
      restaurantContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLeftButtonClick = () => {
    const newScrollPosition = scrollPosition - (containerWidth / 2);
    document.querySelector(".card-slider").scrollTo({
      left: newScrollPosition,
      behavior: "smooth",
    });
    setScrollPosition(newScrollPosition);
  };

  const handleRightButtonClick = () => {
    const newScrollPosition = scrollPosition + (containerWidth / 2);
    document.querySelector(".card-slider").scrollTo({
      left: newScrollPosition,
      behavior: "smooth",
    });
    setScrollPosition(newScrollPosition);
  };


  useEffect(() => {
    axios.get(backend + '/products')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  console.log("data is the ", data)


  useEffect(() => {
    axios.get(backend + '/products-cate1')
      .then(response => {
        setCategory1(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  console.log("data is the ", data)


  useEffect(() => {
    axios.get(backend + '/products-cate2')
      .then(response => {
        setCategory2(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  console.log("data is the ", data)




  return (

    <div>
      <div className='sec'>
        <div id="carouselExampleCaptions" className="container-fluid carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
          <Link to={`/search`} >
            <div className="carousel-item active">
              <img src={img1} className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                
              </div>
            </div>
            <div className="carousel-item">
              <img src={img2} className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
               
              </div>
            </div>
            <div className="carousel-item">
              <img src={img3} className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
               
              </div>
            </div>
            <div className="carousel-item">
              <img src={img4} className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                
              </div>
            </div>
            <div className="carousel-item">
              <img src={img5} className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
               
              </div>
            </div>
            </Link>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

      </div>
      

      <div className="sec container">
        <div className="restaurant-container">
          <div className="label-container">
            <h2>Top Products <span className="">IN World's</span></h2>
            <button className="restaurant-arrow-left" onClick={handleLeftButtonClick}><i className="bi bi-arrow-left"></i></button>
            <button className="restaurant-arrow-right" onClick={handleRightButtonClick}><i className="bi bi-arrow-right"></i></button>
          </div>
          <div className="card-slider">
            {data.map(item => (
               <Link to={`/details/${item.products_id}`} >
              <div class="restaurant-card">
                <div class="image-container">
                  <img src={`http://localhost:9000/images/` + item.images} alt="" />
                  <div class="discount-badge">{item.cate_name}</div>
                </div>
                <h3 class="restaurant-name">{item.name}</h3>
                <div class="info-container">
                  <div class="info-row">
                    <div class="rating">
                      <span class="rating-star"><i class="bi bi-star-fill star"></i></span>
                      <span class="review-count">(4.6)</span>
                    </div>
                    <div class="delivery-info">
                      <i class="bi bi-dot"></i> {item.price} TL
                    </div>
                  </div>


                </div>
              </div>
              </Link>
            ))}



          </div>
        </div>


      </div>

      <div className='sec'>

        <div className="container">
          <div className="row">
            <div className="col-lg-12">

            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="main-section">
                <div className="title">
                  <h2 className='main-titel'>Join the mother and child club for free</h2>
                </div>
                <div className="main-img">
                  <img className='main-imges11' src={im1} alt="" />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="main-section">
                <div className="title">
                  <h2 className='main-titel'>You can support slimmed down</h2>
                </div>
                <div className="main-img">
                  <img className='main-imges11' src={im2} alt="" />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="main-section">
                <div className="title">
                  <h2 className='main-titel'>Best products to used our all</h2>
                </div>
                <div className="main-img">
                  <img className='main-imges11' src={im3} alt="" />
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="main-section">
                <div className="title">
                  <h2 className='main-titel'>New products you can used it</h2>
                </div>
                <div className="main-img">
                  <img className='main-imges11' src={im4} alt="" />
                </div>
              </div>
            </div>

          </div>
        </div>


      </div>



      <div className="sec">

        <div class="container">
          <div class="row">
            <div className="mb-3 col-lg-12 col-md-12 col-sm-12">
              <h3 className='restaurant-name'>New Product's</h3>
            </div>
            {Category1.map(item => (
              <div class="col-md-3 col-sm-6 col-sm-6">
                <Link to={`/details/${item.products_id}`} >
                <div class="main_pro product-grid">
                  <div class="product-image">
                    <a href="#" class="image">
                      <img class="pic-1" src={`http://localhost:9000/images/` + item.images} />
                      <img class="pic-2" src={`http://localhost:9000/images/` + item.images} />
                    </a>
                    

                  </div>
                  <div class="product-content">

                    <h3 class="title"><a href="#">{item.name}</a></h3>
                    <div class="price"> {item.price} TL</div>
                  </div>

                  <div class="d-grid mt-4 mb-2">
                    <button class="btn main-btn" type="button">View Products</button>

                  </div>
                </div>
                </Link>
              </div>
            ))}


          </div>
        </div>
      </div>


      <div className="sec">

<div class="container">
  <div class="row">
    <div className="mb-3 col-lg-12 col-md-12 col-sm-12">
      <h3 className='restaurant-name'>Release Product's</h3>
    </div>
    {Category2.map(item => (
      <div class="col-md-3 col-sm-6 col-sm-6">
        <Link to={`/details/${item.products_id}`} >
        <div class="main_pro product-grid">
          <div class="product-image">
            <a href="#" class="image">
              <img class="pic-1" src={`http://localhost:9000/images/` + item.images} />
              <img class="pic-2" src={`http://localhost:9000/images/` + item.images} />
            </a>
            

          </div>
          <div class="product-content">

            <h3 class="title"><a href="#">{item.name}</a></h3>
            <div class="price"> {item.price} TL</div>
          </div>

          <div class="d-grid mt-4 mb-2">
            <button class="btn main-btn" type="button">View Products</button>

          </div>
        </div>
        </Link>
      </div>
    ))}


  </div>
</div>
</div>


    </div>

  );
};

export default Home;
