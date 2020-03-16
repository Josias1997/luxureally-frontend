import React from 'react';
import { Switch, Route } from 'react-router-dom'
import HomePage from './components/Page/HomePage/HomePage';
import OrdersPage from './components/Page/OrdersPage/OrdersPage';
import { fetchCategories } from './store/actions/categories';
import { connect } from 'react-redux';


const App = (props) => {
  	return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/orders" component={OrdersPage} />
        </Switch>
  );

};

const mapDispatchToProps = dispatch => {
    return {
        onFetchCategories: () => dispatch(fetchCategories())
    }
};

export default connect(null, mapDispatchToProps)(App);
