import React, { Component, useState } from 'react';
import Navbar from '../Layout/Navbar';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import S3 from "react-aws-s3";

window.Buffer = window.Buffer || require("buffer").Buffer;

class AddProducts extends Component {

    constructor() {
        super();
        this.fileInput = React.createRef()
    
        this.state = {
          productName: "",
          productCategory: "",
          productPrice: "",
          productSeller: "",
          productImage: "",
          productDescription: "",
          errors: {},
          progress: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        //Decoding the current user
        const jwt = localStorage.getItem("jwtToken");
        const user = jwtDecode(jwt);
        const username = user.fullName;
        const id = user.id;
        const email = user.username;

        //Image Name part
        let file = this.fileInput.current.files[0];
        let newFileName = this.fileInput.current.files[0].name.replace(/\..+$/, "");

        //AWS S3 \\\\\\\\\\\\\\\\\\\\

        const config = {
            bucketName: 'freshy-images',
            region: 'us-east-1',
            accessKeyId: 'ASIAQWMBXZHAKBEITOXL',
            secretAccessKey: '7vyHRvUnuzraW5+n6TYQx3aoPROEGj0gnfG9gw3k',
            sessionToken: 'FwoGZXIvYXdzEOH//////////wEaDIFrKaNNdSFssg3TyCLNAfPDQv46XgM8EDeeI6euSepUqe+dqmnNxp93ihjlJN5svftl1WzqZvtLXnokeD/yvLjQ2xsflwkTdSdXx4ceNM07h4MXK0TQDAVYHfkm/2nJ9GzRtRHmdhlhhlkrsXy7auxcZg2aGaO0fiOYnbHk+GI83fA1HKvi+vWfton3A37WqremXb59bCP5wE5buv+HJv9XRC+AdChn9ZWxxFRpXIXvpyI7yBHyzA/Ctm94yEnovTFmcA5te/Bn76yZfKCynTJCnsXBivEyyngEGoAo0qiZkwYyLTwCRr7y/yCTyZJcQicIp89MfmFX7BpXSh/hqrQSOwBt/koAEF72utH8slGNuQ=='
        }

        const ReactS3Client = new S3(config);

        //Image Uploading
        ReactS3Client.uploadFile(file, newFileName).then((data) => {
        console.log(data);
        if (data.status === 204) {
            console.log("Image Uploaded");
        } else {
            alert("Image failed to upload");
        }
        });

        // uploadFile(file, config)
        // .then(data => console.log(data))
        // .catch(err => console.error(err))

        /// THE END \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
       

        //Post this to Axios
        axios.post(
            'https://cors-everywhere.herokuapp.com/http://product-service.us-east-1.elasticbeanstalk.com/api/products/addProduct',
            {
              productName: this.state.productName,
              productCategory: this.state.productCategory,
              productPrice: this.state.productPrice,
              productSeller: email,
              productDescription: this.state.productDescription,
              productImage: "https://dn52icgprolk6.cloudfront.net/" + newFileName + ".jpeg"
            }
          );

          //window.location.reload(false);

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {

        return(
            <>
            <Navbar/>
            <div className='register'>
            <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Add New Products!</h1>
            <center><p>If the page refreshes, then adding product was successful! [DEBUG]</p></center>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Product Name"
                    name="productName"
                    value={this.state.productName}
                    required
                    onChange={this.onChange}
                  />
                </div><br></br>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Product Category"
                    name="productCategory"
                    value={this.state.productCategory}
                    required
                    onChange={this.onChange}
                  />
                </div><br></br>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Product Price"
                    name="productPrice"
                    id="productPrice"
                    required
                    value={this.state.productPrice}
                    onChange={this.onChange}
                  />
                </div><br></br>
                <div className="form-group">
                  <textarea
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Product Description"
                    name="productDescription"
                    id="productDescription"
                    required
                    value={this.state.productDescription}
                    onChange={this.onChange}
                  />
                </div><br></br>
                <div className="form-group">
                <input type="file" className="form-control form-control-lg" 
                ref={this.fileInput}
                required
                />
                </div><br></br>
                <center><input type="submit" className="btn btn-info btn-block mt-4" /></center>
              </form>
            </div>
            </div>
            </div>
            </div>
            </>
        );
    }
}
export default AddProducts;