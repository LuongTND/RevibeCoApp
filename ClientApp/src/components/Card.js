import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RoutePath from '../routes/RoutePath';
import '../assets/css/Card.css';
function Card({ img, name, category, quantity, price, rating }) {
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [isAddFilled, setIsAddFilled] = useState(false);

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  const handleAddFilled = () => {
    setIsAddFilled(!isAddFilled);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<i key={i} className="bi bi-star-fill"></i>);
    }
    return stars;
  };

  return (
    <>
      <div className="col-lg-4 col-sm-4 dish-box-wp breakfast" data-cat="breakfast">
        <Link to={RoutePath.PRODUCTINFO}>
          <div className="dish-box text-center text-black">
            <div className="img-container">
              <img src={img} alt='' />
            </div>
            <div className="dish-rating d-flex justify-content-center gap-2">
              {renderStars()}
            </div>
            <div className="dish-title">
              <h3 className="h3-title">{name}</h3>
            </div>
            <div className="dish-info">
              <ul>
                <li>
                  <p>Category</p>
                  <b>{category}</b>
                </li>
                <li>
                  <p>Quantity</p>
                  <b>{quantity}</b>
                </li>
              </ul>
            </div>
            <div className="dist-bottom-row">
              <ul>
                <li>
                  <b>${price}</b>
                </li>
                <li className='d-flex gap-3'>
                  <button className="dish-add-btn" onClick={handleHeartClick}>
                    <i className={`bi bi-suit-heart-fill ${isHeartFilled ? 'text-pink' : ''}`}></i>
                  </button>
                  <button className="dish-add-btn" onClick={handleAddFilled}>
                    {!isAddFilled ? <i className="bi bi-plus-square"></i> : <i class="bi bi-check-circle-fill"></i>}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default Card;
