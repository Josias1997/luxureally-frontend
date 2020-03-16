import React from 'react';
import Orders from './../../UI/Orders/Orders';

const OrdersPage = props => {
    return (
        <div id="body-wrapper" className="header-absolute">
            <Orders history={props.history} />
        </div>  
    )
};

export default OrdersPage;