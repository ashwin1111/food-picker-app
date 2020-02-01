import React, { Component } from "react";
import axios from 'axios';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/DotLoader";
import Modal from "react-awesome-modal";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  position: absolute;
  top: 45%;
  left: 45%;
`;

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            loading: false,
            modal : false,
            errorMsg: 'some error occured'
        };
    }

    openModal() {
        this.setState({
            modal : true
        });
    }
 
    closeModal() {
        this.setState({
            modal : false
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(event) {
        event.preventDefault();

        this.setState({
            loading: true
        });

        const form = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };

        axios.post(process.env.REACT_APP_API_URL_GLITCH+'/auth/register', form).then(res => {
        //axios.post('http://localhost:3000/api/auth/register', form).then(res => {
            console.log('api results:', res.data);
            if (res.data.auth === true) {
                window.location = '/verify-email';
            } 
            // else {
            //     this.setState({
            //         loading: false
            //     });
            //     alert('There was a problem with registering the user');
            // }

            this.setState({
                loading: false
            });
//            localStorage.setItem('x-access-token', res.data.token);
        }).catch(err => {
            console.log('err', err.response);
            this.setState({
                loading: false,
                errorMsg: err.response.data.msg
            });

            this.openModal();
            setTimeout(() => {
                this.closeModal();
            }, 3000);
        });
    }

    render() {
        return (
            <div>
            <form onSubmit={(event) => this.onSubmit(event)}>
                <h3>Sign Up</h3>

                <Modal visible={this.state.modal} width="450" height="100" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div className="form-group">
                        <h1>Oops</h1>
                        <p>{this.state.errorMsg}</p>
                        <button className="btn btn-primary btn-block" onClick={() => this.closeModal()}>Close</button>
                    </div>
                </Modal>

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

                <button type="submit" disabled={!this.state.email || !this.state.password || !this.state.name} onClick={(event) => this.onSubmit(event)} className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/sign-in">sign in?</a>
                </p>
            </form>
            <div className="">
        <ClipLoader
          css={override}
          size={70}
          //size={"150px"} this also works
          color={"#1c8cf6"}
          loading={this.state.loading}
        />
      </div>
      </div>
        );
    }
}