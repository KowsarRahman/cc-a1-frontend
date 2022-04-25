import React, { Component } from 'react'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import UserHeader from './UserHeader';
import PaypalExpressBtn from 'react-paypal-express-checkout';


class ViewProducts extends Component {

    state = {
        products:[]
    }

    componentDidMount() {
        axios.get(`https://cors-everywhere.herokuapp.com/http://product-service.us-east-1.elasticbeanstalk.com/api/products/findProductByName/${this.props.match.params.productName}`)
        .then(res => {
            const products = res.data;
            this.setState( { products });
        })
    }

    render() {

        //Decoding the user
        const jwt = localStorage.getItem("jwtToken");
        const user = jwtDecode(jwt);
        const username = user.fullName;
        const id = user.id;
        const email = user.username;

        //PayPal secret token
        const client = {
            sandbox:    'AcoEYwGkdnyyoLeeE587-akrwyVM-aYij-pJ7gfGLO9Xx9MNsSlsFxaRs5_W4MctSYD9Xw4-tBdTyHni',
        }

        //Successful payment
        const onSuccess = (payment) => {
            console.log("The payment was succeeded!", payment);

            axios.post(
                'https://cors-everywhere.herokuapp.com/http://product-service.us-east-1.elasticbeanstalk.com/api/orders/addOrder',
                {
                  orderProduct: this.state.products.productName,
                  orderPrice: this.state.products.productPrice,
                  orderCategory: this.state.products.productCtaegory,
                  orderQuantity: 1,
                  orderSeller: this.state.products.productSeller,
                  orderPerson: email,
                  status: "Paid"
                }
              );
        }

        return(<>
        <UserHeader username={username} role={localStorage.getItem("role")}/>

<div className="container">

        <div className="card card-body bg-light mb-3">
                    <div className="row">
                        <div className="col-2">
                            <span className="mx-auto">{this.state.products.productName}</span><br></br><br></br>

                            <img src={this.state.products.productImage} style={{width : "123px", height: "120px"}}/>
                        </div>
                        <div className="col-lg-6 col-md-4 col-8">
                            <h3>Name: {this.state.products.productName}</h3>
                            <p>Category: {this.state.products.productCategory}</p>
                            <p>Price: {this.state.products.productPrice}</p>
                            <p>Seller: {this.state.products.productSeller}</p>
                            <p>Description: {this.state.products.productDescription}</p>
                            <PaypalExpressBtn client={client} currency={'AUD'} total={this.state.products.productPrice} onSuccess={onSuccess}/>
                        </div>
                    </div>
                </div>
        </div>
        </>);
    }

}

export default ViewProducts;