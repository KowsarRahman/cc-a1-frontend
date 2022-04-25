import React, { Component } from 'react'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import UserHeader from './UserHeader';
import PaypalExpressBtn from 'react-paypal-express-checkout';

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
    }


    render() {

        //Making the payment
        const onSuccess = (payment) => {
            // Congratulation, it came here means everything's fine!
            		console.log("The payment was succeeded!", payment);
            		// You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
        }

        //Decoding the current user
        const jwt = localStorage.getItem("jwtToken");
        const user = jwtDecode(jwt);
        const username = user.fullName;
        const id = user.id;
        const email = user.username;

        //Check if there is an session or not
        const checkSession = () => {
            if(username != null) {
                
            } else {
                window.location.href="/";
            }
        }

        //PayPal secret token
        const client = {
            sandbox:    'AcoEYwGkdnyyoLeeE587-akrwyVM-aYij-pJ7gfGLO9Xx9MNsSlsFxaRs5_W4MctSYD9Xw4-tBdTyHni',
        }

        return(<>
        {checkSession()}
        <UserHeader username={username}/>
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
                            {/* <PaypalExpressBtn client={client} currency={'AUD'} total={product.productPrice} onSuccess={onSuccess}/>
                            <a href={'/viewProducts/' + product.productImage}>View The Product</a> */}
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

export default Landing;