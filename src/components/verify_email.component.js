import React, { Component } from "react";
import { Redirect } from 'react-router-dom'

export default class VerifyEmail extends Component {
    onSubmit(e) {
//        window.location = '/sign-in';
        return <Redirect to='/sign-in' />
    }

    state = {
        redirect: false
      }
      setRedirect = () => {
        this.setState({
          redirect: true
        })
      }
      renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/sign-in' />
        }
      }

    render() {
        return (
            <div>
            <form>
                <h3>Verify Email</h3>

                <div className="form-group">
                    <label className="Verify-email">Please verify your account with the link forwarded to your email id to start using Lunch Picker</label>
                </div>
                {this.renderRedirect()} 
                <button type="submit" onClick={this.setRedirect} className="btn btn-primary btn-block">Proceed to Login</button>
            </form>
            </div>
        );
    }
}
