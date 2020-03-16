import React, {Component} from 'react';
import { setClientGoal, setClientData, setClientSocket } from './../../../store/actions/client';
import { fetchCategories } from './../../../store/actions/categories';
import { connect } from 'react-redux';
import axios from './../../../instanceAxios';
import socketIOClient from 'socket.io-client';
import { baseURL } from './../../../config';

class Form extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            address: '',
            phone: '',
            restaurant: '',
            restaurants: []
        };
    }

    componentDidMount() {
        axios.get('/api/restaurants/')
            .then(({data}) => {
                this.setState({
                    restaurants: data
                })
            }).catch(error => {
                console.log(error);
            })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    };

    openSocket = (email) => {
        const socket = socketIOClient(`${baseURL}/`);
        socket.emit('newDelivery', email);
        this.props.onSetClientSocket(socket);
    }

    handleValidation = () => {
        this.props.onSetClientGoal("DELIVERY");
        this.props.onSetClientData({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            address: this.state.address,
            phone: this.state.phone,
            restaurant: this.state.restaurant
        });
        this.props.onFetchCategories(this.state.restaurant);
        this.openSocket(this.state.email);
    }

    render() {
        return (
        <div className="modal fade" id="formModal" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header modal-header-lg dark bg-dark">
                        <div className="bg-image"><img src="assets/img/photos/modal-add.jpg" alt=""/></div>
                        <h4 className="modal-title">Specify your dish</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><i className="ti-close"></i></button>
                    </div>
                    <div className="col-md-12">
                        <div className="bg-white p-4 p-md-5 mb-4">
                            <h4 className="border-bottom pb-4"><i className="ti ti-user mr-3 text-primary"></i>Basic informations</h4>
                            <div className="row mb-5">
                                <div className="form-group col-sm-6">
                                    <label>First Name:</label>
                                    <input type="text" value={this.state.firstName} id="firstName" className="form-control" onChange={this.handleChange}/>
                                </div>
                                <div className="form-group col-sm-6">
                                    <label>Last Name:</label>
                                    <input type="text" value={this.state.lastName} id="lastName" className="form-control" onChange={this.handleChange}/>
                                </div>
                                <div className="form-group col-sm-6">
                                    <label>E-mail address:</label>
                                    <input type="email" value={this.state.email} id="email" className="form-control" onChange={this.handleChange}/>
                                </div>
                                <div className="form-group col-sm-6">
                                    <label>Full Address:</label>
                                    <input type="text" value={this.state.address} id="address" className="form-control" onChange={this.handleChange}/>
                                </div>
                                <div className="form-group col-sm-6">
                                    <label>Phone number:</label>
                                    <input type="text" value={this.state.phone} id="phone" className="form-control" onChange={this.handleChange}/>
                                </div>
                                <div className="form-group col-sm-6">
                                    <label>Restaurant:</label>
                                    <select id="restaurant" className="form-control" onChange={this.handleChange}>
                                        {
                                            this.state.restaurants.map(restaurant => <option key={restaurant._id}
                                                value={restaurant._id}>
                                                    {restaurant.name}
                                                </option>)
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button onClick={this.handleValidation} type="button" className="modal-btn btn btn-secondary btn-block btn-lg" data-dismiss="modal">
                        <span>Validate</span>
                    </button>
                </div>
            </div>
    </div>
    )
    }
    
}

const mapDispatchToProps = dispatch => {
    return {
        onSetClientData: (data) => dispatch(setClientData(data)),
        onSetClientGoal: (goal) => dispatch(setClientGoal(goal)),
        onSetClientSocket: (socket) => dispatch(setClientSocket(socket)),
        onFetchCategories: (restaurantId) => dispatch(fetchCategories(restaurantId))
    }
}

export default connect(null, mapDispatchToProps)(Form);