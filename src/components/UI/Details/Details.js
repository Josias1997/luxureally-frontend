import React from 'react';
import { connect } from 'react-redux';

const Details = ({ order_items, id, index, goal }) => {
    return (
        <div className="modal fade mt-20" id={`detailsModal${id}`} role="dialog">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header modal-header-lg dark bg-dark">
                    <div className="bg-image"><img src="assets/img/photos/modal-add.jpg" alt=""/></div>
                    <h4 className="modal-title">{goal === "DELIVERY" ? "Delivery" : "Order"} N°{index} details</h4>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><i className="ti-close"></i></button>
                </div>
                <div className="modal-product-details">
                {
                    order_items.map(order_item => {
                        return <div key={order_item._id} className="row align-items-center">
                            <div className="col-8">
                                <h6 className="mb-0">{order_item.title}</h6>
                                <span className="text-muted">{order_item.quantity} items</span>
                            </div>
                            <div className="col-4 text-lg text-left">{order_item.price} MAD</div>
                        </div>
                    })
                }
                </div>
                <div className="modal-body panel-details-container">
                </div>
                <button type="button" 
                        className="modal-btn btn btn-secondary btn-block btn-lg" data-dismiss="modal">
                    <span>OK</span>
                </button>
            </div>
        </div>
    </div>
    )
};

const mapStateToProps = state => {
    return {
        goal: state.client.goal
    }
}

export default connect(mapStateToProps)(Details);