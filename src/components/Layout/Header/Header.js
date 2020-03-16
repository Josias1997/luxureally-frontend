import React from 'react';
import { connect } from 'react-redux';


const Header = props => {
    return (
        <>
            <header id="header-mobile" className="light">

                <div className="module module-nav-toggle">
                    <a href="/" id="nav-toggle" data-toggle="panel-mobile"><span></span><span></span><span></span><span></span></a>
                </div>    

                <div className="module module-logo">
                    <a href="index.html">
                        <img src="/assets/img/logo-horizontal-dark-red.svg" alt=""/>
                    </a>
                </div>

                <a href="/" className="module module-cart" data-target="#checkoutModal" data-toggle="modal">
                    <i className="ti ti-shopping-cart"></i>
                    <span className="notification">{props.totalQuantity}</span>
                </a>

            </header>
        </>
    )
}

const mapStateToProps = state => {
    return {
        totalQuantity: state.cart.totalQuantity,
    }
};

export default connect(mapStateToProps)(Header);