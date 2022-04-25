import React, { Component } from 'react';
import Navbar from '../Layout/Navbar';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { login } from '../../actions/securityActions';  
import axios from "axios";

class Login extends Component {

    constructor() {
        super();
    
        this.state = {
          username: "",
          password: "",
          errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        const LoginRequest = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.login(LoginRequest);


    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors } = this.state;
        return(
            <>
            <Navbar/>
            <div className='register'>
            <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In to be freshy customer!</h1>
            <center><p>If the page goes to dashboard, then login was successful!</p></center>
            <form onSubmit={this.onSubmit}>
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
                <center><input type="submit" className="btn btn-danger btn-block mt-4" value="Log In"/></center>
              </form>
            </div>
            </div>
            </div>
            </div>
            </>
        );
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
  };
  
const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors
});
  
export default connect(
    mapStateToProps,
    { login }
)(Login);