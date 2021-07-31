import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import "../assets/styles/components/SingleCard.scss";
import { selectProduct, showProduct } from "../redux/products";

function SingleCard() {
  const { productSelected } = useSelector((store) => store.products);

  const match = useRouteMatch();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!Object.keys(productSelected).length) {
      const { productId } = match.params;
      dispatch(selectProduct(productId));
    }
  }, []);

  return (
    <div className="container text-dark">
      <div className="row">
        <div className="col-md-8">
          <h2 className="mb-4 text-light">{productSelected.name}</h2>
          <ul className="list-group">
            <li className="list-group-item">
              <strong>Price:</strong> {productSelected.price}
            </li>
            <li className="list-group-item">
              <strong>Stock:</strong> {productSelected.stock}
            </li>
            <li className="list-group-item">
              <strong>Description:</strong> {productSelected.description}
            </li>
          </ul>
        </div>
        <div className="col-md-4">
          <img
            className="cardImg"
            src={productSelected.image}
            alt="t-shirt"
          ></img>
        </div>
      </div>
    </div>

    // <div className='singleCardContainer'>

    //         <div className='cardImgWrapper' >
    //         <img className='cardImg' src={productSelected.image} alt='t-shirt'></img>
    //         </div>

    //         <div className='cardDescription'>
    //             <h3>{productSelected.name}</h3>
    //             <p>{productSelected.description}</p>

    //         </div>

    // </div>
  );
}

export default SingleCard;
