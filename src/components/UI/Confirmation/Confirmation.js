import React from 'react';
import './Confirmation.css';
import { connect } from 'react-redux';
import { addItemToCart } from './../../../store/actions/cart';
import { baseURL } from './../../../config';

const Confirmation = ({ foodToBeAddedToCart, onAddItemToCart }) => {
    console.log(foodToBeAddedToCart);
    return (
        <div className="modal fade mt-20" id="productModal" role="dialog">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header modal-header-lg dark bg-dark">
                    <div className="bg-image">
                        <img src={baseURL + foodToBeAddedToCart.image} alt=""/>
                    </div>
                    <h4 className="modal-title">Confirmation</h4>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><i className="ti-close"></i></button>
                </div>
                <div className="modal-product-details">
                    <div className="row align-items-center">
                        <div className="col-9">
                            <h6 className="mb-0">{foodToBeAddedToCart.title}</h6>
                            <span className="text-muted">{foodToBeAddedToCart.description}</span>
                        </div>
                        <div className="col-3 text-lg text-right">MAD {foodToBeAddedToCart.price}</div>
                    </div>
                </div>
                <div className="modal-body panel-details-container">
                </div>
                <button onClick={() => onAddItemToCart(foodToBeAddedToCart)} 
                        type="button" 
                        className="modal-btn btn btn-secondary btn-block btn-lg" data-dismiss="modal">
                    <span>Add to Cart</span>
                </button>
            </div>
        </div>
    </div>
    )
};

const mapStateToProps = state => {
    return {
        foodToBeAddedToCart: state.cart.foodToBeAddedToCart
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddItemToCart: (item) => dispatch(addItemToCart(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);