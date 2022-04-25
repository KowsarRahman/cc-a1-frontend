import React, { Component } from 'react'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import UserHeader from './UserHeader';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { getPerson } from '../../actions/securityActions';

class Landing extends Component {

    state = {
        products: []
    }

    componentDidMount() {
        //View all products
        axios.get('https://cors-everywhere.herokuapp.com/http://product-service.us-east-1.elasticbeanstalk.com/api/products/findProducts')
        .then(res => {
            const products = res.data;
            this.setState( { products });
        })

        //Decoding the current user
        const jwt = localStorage.getItem("jwtToken");
        const user = jwtDecode(jwt);
        const username = user.fullName;
        const id = user.id;
        const email = user.username;

        this.props.getPerson(id, this.props.history); //get all the information related to the current user


    }


    render() {


        //Decoding the current user
        const jwt = localStorage.getItem("jwtToken");
        const user = jwtDecode(jwt);
        const username = user.fullName;
        const id = user.id;
        const email = user.username;
        const role = localStorage.getItem("role");

        //Check if there is an session or not
        const checkSession = () => {
            if(username != null) {
                
            } else {
                window.location.href="/";
            }
        }


        return(<>
        {checkSession()}
        <UserHeader username={username} role={role}/>
        <div className="container">
            <div class="row">
            <h3><center>Products in our stock</center></h3>
            {this.state.products.map(product=> 
                        <>
                        <div className="card" style={{width : "18rem"}}>
                        <div className="card-body">
                            <img src={product.productImage} style={{width : "123px", height: "120px"}}/>
                            <p className="card-text"><strong>Product:</strong> {product.productName}</p>
                            <p className="card-text"><strong>Category:</strong> {product.productCategory}</p>
                            <p className="card-text"><strong>Price</strong>: AUD {product.productPrice}.00</p>
                            <p className="card-text"><strong>Seller:</strong> {product.productSeller}</p>
                            <p className="card-text"><strong>Description:</strong> {product.productDescription}</p>
                            <button className="btn btn-lg btn-success" onClick={() => {
                                window.location.href = "/viewProducts/" + product.productName;
                            }}>
                                View
                            </button>
                        </div>
                        </div>
                        </>)}
            </div>
        </div>
        </>);
    }
}

Landing.propTypes = {
    getPerson: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };
  
const mapStateToProps = state => ({
errors: state.errors
});
  
export default connect(
    mapStateToProps,
    { getPerson }
)(Landing);