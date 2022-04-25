import React, { Component } from 'react'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import UserHeader from './UserHeader';
import PaypalExpressBtn from 'react-paypal-express-checkout';


class ViewOrders extends Component {

    state = {
        orders:[]
    }

    componentDidMount() {
         //Decoding the user
         const jwt = localStorage.getItem("jwtToken");
         const user = jwtDecode(jwt);
         const username = user.fullName;
         const id = user.id;
         const email = user.username;

        axios.get(`https://cors-everywhere.herokuapp.com/http://product-service.us-east-1.elasticbeanstalk.com/api/orders/findOrderByPerson/${email}`)
        .then(res => {
            const orders = res.data;
            this.setState( { orders });
        })
    }

    render() {

        //Decoding the user
        const jwt = localStorage.getItem("jwtToken");
        const user = jwtDecode(jwt);
        const username = user.fullName;
        const id = user.id;
        const email = user.username;

        return(<>
        <UserHeader username={username} role={localStorage.getItem("role")}/>

<div className="container">

        <div className="card card-body bg-light mb-3">
                    <div className="row">
                    {this.state.orders.map(order=> 
                        <>
                        <div className="col-lg-6 col-md-4 col-8">
                            <p className="card-text"><strong>Product:</strong> {order.orderProduct}</p>
                            <p className="card-text"><strong>Price:</strong>AUD {order.orderPrice}</p>
                            <p className="card-text"><strong>Seller</strong>: {order.orderSeller}</p>
                            <p className="card-text"><strong>Status:</strong> {order.status}</p>
                        </div>
                        </>)}
                    </div>
                </div>
        </div>
        </>);
    }

}

export default ViewOrders;
