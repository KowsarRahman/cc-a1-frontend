import React, { Component } from 'react'

 class UserHeader extends Component {
    //Usual Page && Navbar
    render() {
        return (
            <div>
            <nav className="navbar navbar-expand-sm navbar-dark bg-info mb-4">
            <div className="container">
                <a className="navbar-brand" href="/dashboard">
                    Freshy
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                    <span className="navbar-toggler-icon" />
                </button>
    
                <div className="collapse navbar-collapse" id="mobile-nav">
    
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link " href="/dashboard">
                                G'Day {this.props.username}
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " href="/orders">
                                Order History
                            </a>
                        </li>
                        <li className="nav-item">
                        <a  className="nav-link" onClick={() => {
                                localStorage.clear();
                                window.location.href = "/";
                            }}>
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
            </div>
        )
    }
}
export default UserHeader;