import React, {useEffect} from 'react';
import Login from './../../UI/Login/Login';
import Dashboard from './../../UI/Dashboard/Dashboard';
import { connect } from 'react-redux';
import { checkAuthState } from './../../../store/actions/auth';


const AdminPage = (props) => {

    useEffect(() => {
        props.onCheckAuthState();
    }, []);

    return (props.token === null ? <Login /> : <Dashboard />)
};

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        loading: state.auth.loading,
        error: state.auth.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCheckAuthState: () => dispatch(checkAuthState()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);