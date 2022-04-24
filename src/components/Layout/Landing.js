import React, { Component } from 'react'
import Navbar from './Navbar';
import axios from 'axios';

class Landing extends Component {

    state = {
        products: []
    }

    componentDidMount() {

        //View all books
        axios.get('https://cors-everywhere.herokuapp.com/http://product-service.us-east-1.elasticbeanstalk.com/api/products/findProducts')
        .then(res => {
            const products = res.data;
            this.setState( { products });
        })
    }

    render() {
        return(<>
        <Navbar/>
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
                            <p className="card-text"><strong>Price</strong>: AUD {product.productPrice}0</p>
                            <p className="card-text"><strong>Seller:</strong> {product.productSeller}</p>
                            <p className="card-text"><strong>Description:</strong> {product.productDescription}</p>                      
                        </div>
                        </div>
                        </>)}
            </div>
        </div>
        </>);
    }
}

export default Landing;