import React, { Component } from 'react';
import Navbar from '../Layout/Navbar';
import axios from 'axios';

class Register extends Component {

    constructor() {
        super();
    
        this.state = {
          username: "",
          fullName: "",
          password: "",
          phone_number: "",
          role: "",
          errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        //Post this to Axios
        axios.post(
            'https://cors-everywhere.herokuapp.com/http://login-microservice.us-east-1.elasticbeanstalk.com/api/users/register',
            {
              fullName: this.state.fullName,
              username: this.state.username,
              password: this.state.password,
              phone_number: this.state.phone_number,
              confirmPassword: this.state.password,
              role: "Customer"
            }
          );

          window.location.href="/"; //redirects to login page

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
            <h1 className="display-4 text-center">Sign Up to be freshy customer!</h1>
            <center><p>If the page goes to login page, then sign up was successful!</p></center>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Full Name"
                    name="fullName"
                    value={this.state.fullName}
                    required
                    onChange={this.onChange}
                  />
                </div><br></br>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Username"
                    name="username"
                    value={this.state.username}
                    required
                    onChange={this.onChange}
                  />
                </div><br></br>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    id="password"
                    required
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div><br></br>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Phone Number"
                    name="phone_number"
                    id="phone_number"
                    required
                    value={this.state.phone_number}
                    onChange={this.onChange}
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
export default Register;