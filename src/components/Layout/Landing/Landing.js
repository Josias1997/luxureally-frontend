import React from 'react';

const Landing = (props) => {
    return (
        <section className="section section-main bg-dark dark">

            <div className="bg-image bg-fixed"><img src="assets/img/photos/hero-burger.jpg" alt="" /></div>

            <div className="container v-center">
                <div className="row">
                    <div className="col-md-7 push-md-3">
                        <h1 className="display-2">We do <strong>The Best Burgers</strong> in London</h1>
                        <h4 className="text-muted mb-5">Taste it now with our online order!</h4>
                        <button onClick={() => props.changeMode()} className="btn btn-outline-primary btn-lg">
                            <span>Scan QR Code</span>
                        </button>
                        <button className="btn btn-outline-primary btn-lg" data-target="#formModal" data-toggle="modal">
                            <span>Home Delivery</span>
                        </button>
                    </div>
                </div>
            </div>

        </section>
    )
};

export default Landing;