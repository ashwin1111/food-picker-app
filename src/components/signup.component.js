import React, { Component } from "react";
import axios from 'axios';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(values) {
        values.preventDefault();

        this.setState({
            name: '',
            email: '',
            password: ''
        });

        const form = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };

        axios.post(process.env.REACT_APP_API_URL+'/auth/register', form).then(res => {
        //axios.post('http://localhost:3000/api/auth/register', form).then(res => {
            console.log('api results:', res.data);
            if (res.data.auth === true) {
                window.location = '/verify-email';
            } else {
                alert('There was a problem with registering the user');
            }
//            localStorage.setItem('x-access-token', res.data.token);
        });
    }

    render() {
        return (
            <form>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Name</label>
                    <input name="name" type="text" className="form-control" placeholder="Name" value={this.state.name} onChange={e => this.handleChange(e)} />
                </div>

                {/* <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" />
                </div> */}

                <div className="form-group">
                    <label>Email address</label>
                    <input name="email" type="email" className="form-control" placeholder="Enter email" value={this.state.email} onChange={e => this.handleChange(e)} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input name="password" type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={e => this.handleChange(e)} />
                </div>

                <button type="submit" disabled={!this.state.email || !this.state.password || !this.state.name} onClick={(e) => this.onSubmit(e)} onSubmit={(values) => this.onSubmit(values)} className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/sign-in">sign in?</a>
                </p>
            </form>
        );
    }
}