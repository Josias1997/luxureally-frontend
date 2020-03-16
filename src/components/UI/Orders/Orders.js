import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { placingOrderSucceed, setOrders } from './../../../store/actions/orders';
import Details from './../Details/Details';
import axios from './../../../instanceAxios';

const Orders = props => {
    const [additionAsked, setAdditionAsked] = useState(false);
    const [additions, setAdditions] = useState([]);

    const timer = useRef(null);

    const additionTimer = useRef(null);

    useEffect(() => {
        timer.current = setInterval(() => {
            if (props.goal === "DELIVERY") {
                axios.get(`/api/deliveries/client/${props.data.email}`)
                    .then(({data}) => {
                        props.onSetOrders(data);
                    }).catch(err => {
                        console.log(err);
                    })
            } else if (props.goal === "ON PLACE ORDER") {
                axios.get(`/api/orders/table/${props.data.tableId}`)
                    .then(({data}) => {
                        props.onSetOrders(data);
                    }).catch(err => {
                        console.log(err);
                    })
            }

            return () => {
                window.clearInterval(timer.current);
                window.clearInterval(additionTimer.current);
            }
        }, 1000)
    }, []);

    const goToHomepage = () => {
        props.history.push("/");
    }

    const askAddition = () => {
        const data = {
            table: props.data.tableId,
            total_price: props.totalPrice
        };

        axios.post('/api/additions/', data)
            .then(({data}) => {
                setAdditionAsked(true);
                setAdditions(current => {
                    const update = [...current];
                    update.push(data);
                    return update;
                })
                window.clearInterval(timer.current);
            }).catch(error => {
                console.log(error);
            });

        additionTimer.current = setInterval(() => {
            axios.get(`/api/additions/table/${props.data.tableId}`)
                .then(({data}) => {
                    setAdditions(current => data);
                }).catch(error => {
                    console.log(error);
                })
        }, 1000)
    };

    return (
        <>
        <div className="mt-5" id="checkoutModal" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header modal-header-lg dark bg-dark">
                        <div className="bg-image"><img src="assets/img/photos/modal-add.jpg" alt=""/></div>
                        <h4 className="modal-title">{props.goal === "DELIVERY" ? "Current Deliveries" : "Current Orders"}</h4>
                    </div>
                    <table className="table-cart">
                    {
                        !additionAsked ? props.orders.reverse().map((order, index) => {
                            return <><tr key={order._id}>
                                <td className="price">MAD {order.total_price}</td>
                                <td className={ "text-bold " + (order.status === "TREATING" ? "text-danger" : "text-success")}>
                                    {order.status}
                                </td>
                                <td className="actions">
                                    <span data-target={`#detailsModal${order._id}`} data-toggle="modal" className="action-icon">
                                        <i className="ti ti-plus"></i> Details
                                    </span>
                                </td>
                            </tr>
                            <Details index={index + 1} order_items={order.order_items} id={order._id} />
                            </>
                        }) : ( additions.length !== 0 ? additions.map(addition => <tr>
                            <td className="text-bold price">{addition.total_price} MAD</td>
                            <td className={ "text-bold " + (addition.status === "NON PAID" ? "text-danger" : "text-success")}>
                                {addition.status}
                            </td>
                        </tr>) : null)
                        
                    }
                    </table>
                    {
                        !additionAsked ? <div className="cart-summary">
                        <div className="row">
                            <div className="col-7 text-right text-muted">Total: </div>
                            <div className="col-5"><strong>{props.orders.length}</strong></div>
                        </div>
                        <hr className="hr-sm" />
                        <div className="row text-lg">
                            <div className="col-7 text-right text-muted">Total Price: </div>
                            <div className="col-5"><strong>{props.totalPrice} MAD</strong></div>
                        </div>
                    </div> : null
                    }
                    <button onClick={() => goToHomepage()} 
                        type="button" className="modal-btn btn btn-secondary btn-block btn-lg" data-dismiss="modal">
                        <span>New Order</span>
                    </button>
                    {
                        !additionAsked ? (props.goal === "ON PLACE ORDER" ? 
                        <button type="button" onClick={askAddition}
                            className="modal-btn btn btn-secondary btn-block btn-lg" data-dismiss="modal">
                            <span>ASK ADDITION</span>
                        </button> : null) : null
                    }
                </div>
            </div>
        </div>

        </>
    )
};

const mapStateToProps = state => {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading,
        error: state.orders.orders,
        totalPrice: state.orders.totalPrice,
        goal: state.client.goal,
        data: state.client.data,
        socket: state.client.socket
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onPlacingOrderSucceed: order => dispatch(placingOrderSucceed(order)),
        onSetOrders: orders => dispatch(setOrders(orders))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);