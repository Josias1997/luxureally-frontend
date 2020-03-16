import React from 'react';
import { updateFoodToBeAddedToCart } from './../../../store/actions/cart';
import { connect } from 'react-redux';
import { baseURL } from './../../../config';

const Food = ({ food, onUpdateFoodToBeAddedToCart }) => {
    return (
        <div className="col-lg-4 col-6">
            <div className="menu-item menu-grid-item">
                <img className="mb-4" src={baseURL + food.image} alt=""/>
                <h6 className="mb-0">{food.title}</h6>
                <span className="text-muted text-sm">{food.description}</span>
                <div className="row align-items-center mt-4">
                    <div className="col-sm-6"><span className="text-md mr-4">
                        <span className="text-muted">from</span> MAD {food.price}</span>
                    </div>
                    <div onClick={() => onUpdateFoodToBeAddedToCart(food)} className="col-sm-6 text-sm-right mt-2 mt-sm-0">
                        <button className="btn btn-outline-secondary btn-sm" data-target="#productModal" data-toggle="modal">
                            <span>Add to cart</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


const mapDispatchToProps = dispatch => {
    return {
        onUpdateFoodToBeAddedToCart: (food) => dispatch(updateFoodToBeAddedToCart(food))
    }
}

export default connect(null, mapDispatchToProps)(Food);