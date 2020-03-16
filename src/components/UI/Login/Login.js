import React, {Component} from 'react';
import { connect } from 'react-redux';
import { authenticate } from './../../../store/actions/auth';
import Spinner from './../Spinner/Spinner';


class Login extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: ''
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = () => {
        this.props.onAuthenticate(this.state.username, this.state.password);
    };


    render(){
        return (
            <div className="container">
            {
                this.props.loading ? <Spinner /> : <div className="col-md-12">
                    <div className="row mt-5 d-flex justify-content-center">
                        <input type="text" 
                            id="username" 
                            placeholder="Username" 
                            className="form-control mt-2"
                            value={this.state.username}
                            onChange={this.handleChange} />
                        <input type="password" 
                            id="password" 
                            placeholder="Password" 
                            className="form-control mt-2"
                            value={this.state.password}
                            onChange={this.handleChange} />
                    </div>
                    <div className="row mt-3 d-flex justify-content-center">
                        <button onClick={this.handleSubmit} type="submit" className="btn btn-primary btn-block" >Login</button>
                    </div>
                    {
                        this.props.error !== null ? <div className="alert alert-danger mt-3">Authentication failed: wrong username or password</div> : null
                    }
                </div>
            }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuthenticate: (username, password) => dispatch(authenticate(username, password)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);