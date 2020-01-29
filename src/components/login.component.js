import React, { Component } from "react";
import axios from 'axios';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/DotLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  position: absolute;
  top: 45%;
  left: 45%;
`;

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false
        };
    }

    componentDidMount() {
        if (localStorage.getItem('x-access-token') !== null) {
            window.location = '/me';
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(values) {
        values.preventDefault();

        this.setState({
            loading: true
        });

        const form = {
         email: this.state.email,
         password: this.state.password
        };

        axios.post(process.env.REACT_APP_API_URL+'/auth/login', form).then(res => {
        //axios.post('http://localhost:3000/api/auth/login', form).then(res => {
            console.log('api results:', res.data);
            if (res.data.auth === true) {
                window.location = '/me';
            } else if (res.data.auth === true && res.data.msg === 'Account not verified') {
                window.location = '/verify-email';
            } else {
                alert('There was a problem while logging the user in');
            }

            localStorage.setItem('x-access-token', res.data.token);
            this.setState({
                loading: false
            });
        }).catch(err => {
            alert('error occured while logging the user in');
        })
    }

    render() {
        return (
            <div>
            <form>
                <h3>Sign In</h3>
                <div className="form-group">
                    <label>Email address</label>
                    <input name="email" type="email" className="form-control" placeholder="Enter email" value={this.state.email} onChange={e => this.handleChange(e)} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input name="password" type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={e => this.handleChange(e)} />
                </div>

                {/* <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div> */}
                <br></br>

                <button type="submit" disabled={!this.state.email || !this.state.password} onClick={(e) => this.onSubmit(e)} onSubmit={(values) => this.onSubmit(values)} className="btn btn-primary btn-block">Submit</button>

                <p className="forgot-password text-right">
                    New user <a href="/sign-up">sign up?</a>
                </p>
                <div className="">
        <ClipLoader
          css={override}
          size={70}
          //size={"150px"} this also works
          color={"#1c8cf6"}
          loading={this.state.loading}
        />
      </div>

                {/* <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p> */}
            </form>
            </div>
        );
    }
}
