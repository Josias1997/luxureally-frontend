import React from 'react';
import Category from './../../UI/Category/Category';
import Spinner from './../../UI/Spinner/Spinner';
import { connect } from 'react-redux';


const Main = (props) => {
    return (
        <>
        {
            props.data ? null : <div className="page-title bg-light">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 push-lg-4">
                        <h1 className="mb-0">Menu</h1>
                        <h4 className="text-muted mb-0">Scan QR Code or Choose Home delivery to see our menu</h4>
                    </div>
                </div>
            </div>
        </div>
        }
        <div className="page-content" id="main">
            <div className="container">
                <div className="row no-gutters">
                    <div className="col-md-10 push-md-1" role="tablist">
                        {
                            props.loading === false ? props.categories.map(category => <Category key={category._id} category={category} />) : 
                            <div className="d-flex justify-content-center">
                                <Spinner />
                            </div>
                        }
                    </div>
                </div>
            </div>
            <button type="button" className="btn btn-primary btn-block btn-lg" 
                data-target="#checkoutModal" data-toggle="modal" style={{
                    position: 'fixed',
                    zIndex: '100',
                    bottom: 0
                }}>
                    <span>Checkout</span>
            </button>
        </div>
        </>
    )
};

const mapStateToProps = state => {
    return {
        categories: state.categories.categories,
        loading: state.categories.loading,
        error: state.categories.error,
        data: state.client.data
    }
}

export default connect(mapStateToProps)(Main);