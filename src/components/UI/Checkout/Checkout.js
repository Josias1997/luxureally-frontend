import React, {useState} from 'react';
import { connect } from 'react-redux';
import { removeItemFromCart, updateCartItemQuantity } from './../../../store/actions/cart';
import { placeOrder } from './../../../store/actions/orders';

const Checkout = props => {
    const [onEditMode, setOnEditMode] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [orderDetails, setOrderDetails] = useState('');

    const handleChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleDetailsChange = (event) => {
        setOrderDetails(event.target.value);
    };

    const order = () => {
        props.onPlaceOrder(props.goal === 'DELIVERY' ? 'delivery' : 'simple_order', props.goal === 'DELIVERY' ? {
            restaurant: props.data.restaurant,
            firstName: props.data.firstName,
            lastName: props.data.lastName,
            email: props.data.email,
            address: props.data.address,
            phone: props.data.phone,
            total_price: props.totalPrice,
            order_items: props.cart.map(item => {
                return {
                    _id: item._id,
                    title: item.title,
                    price: item.price,
                    quantity: item.quantity,
                }
            }),
            order_details: orderDetails === '' ? 'none' : orderDetails,
        } : {
            table: props.data.tableId,
            total_price: props.totalPrice,
            order_details: orderDetails === '' ? 'none' : orderDetails,
            order_items: props.cart.map(item => {
                return {
                    _id: item._id,
                    title: item.title,
                    price: item.price,
                    quantity: item.quantity,
                }
            }),
        }, props.socket);
        props.history.push('/orders');   
    };

    return (
        <div className="modal fade mt-5" id="checkoutModal" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header modal-header-lg dark bg-dark">
                        <div className="bg-image"><img src="assets/img/photos/modal-add.jpg" alt=""/></div>
                        <h4 className="modal-title">Specify your dish</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><i className="ti-close"></i></button>
                    </div>
                    <div className="col-md-12">
                        <div className="bg-white p-4 p-md-5 mb-4">
                            <h4 className="border-bottom pb-4"><i className="ti ti-question mr-3 text-primary"></i>{props.goal === "DELIVERY" ? "Delivery Details" : "Order Details"}</h4>
                            <div className="row mb-5">
                                <div className="form-group col-sm-12">
                                    <textarea id="details" value={orderDetails} className="form-control" onChange={handleDetailsChange}></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <table className="table-cart">
                        {
                            props.cart.map(item => <tr key={item._id}>
                                <td className="title">
                                    <span className="name"><a href="#productModal" data-toggle="modal">{item.title}</a></span>
                                    <span className="caption text-muted">{item.description}</span>
                                </td>
                                <td className="price">MAD {item.price}</td>
                                {
                                    !onEditMode ? <td className="price">{item.quantity}</td> : <>
                                    <input type="number" min="0" id="quantity" className="form-control" value={quantity} onChange={handleChange}/> 
                                    <span onClick={() => {
                                        props.onUpdateCartItemQuantity(item._id, quantity);
                                        setOnEditMode(false);
                                    }} className="action-icon" style={{
                                        color: 'green'
                                    }}>
                                        <i className="ti ti-check"></i>
                                    </span>
                                    <span onClick={() => setOnEditMode(false)} className="action-icon" style={{
                                        color: 'red'
                                    }}>
                                        <i className="ti ti-close"></i>
                                    </span> </>
                                }
                                <td className="actions">
                                    <span onClick={() => setOnEditMode(true)} className="action-icon"><i className="ti ti-pencil"></i></span>
                                    <span onClick={() => props.onRemoteItemFromCart(item._id)} className="action-icon">
                                        <i className="ti ti-close"></i>
                                    </span>
                                </td>
                            </tr>)
                        }
                    </table>
                    <div className="cart-summary">
                        <div className="row">
                            <div className="col-7 text-right text-muted">Total Quantity:</div>
                            <div className="col-5"><strong>{props.totalQuantity}</strong></div>
                        </div>
                        <hr className="hr-sm" />
                        <div className="row text-lg">
                            <div className="col-7 text-right text-muted">Total Price:</div>
                            <div className="col-5"><strong>MAD {props.totalPrice}</strong></div>
                        </div>
                    </div>
                    <button onClick={order} 
                            type="button" 
                            className="modal-btn btn btn-secondary btn-block btn-lg" data-dismiss="modal">
                        <span>Order</span>
                    </button>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        cart: state.cart.cart,
        totalQuantity: state.cart.totalQuantity,
        totalPrice: state.cart.totalPrice,
        data: state.client.data,
        goal: state.client.goal,
        socket: state.client.socket
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onRemoteItemFromCart: _id => dispatch(removeItemFromCart(_id)),
        onUpdateCartItemQuantity: (_id, quantity) => dispatch(updateCartItemQuantity(_id, quantity)),
        onPlaceOrder: (type, data, socket) => dispatch(placeOrder(type, data, socket))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);