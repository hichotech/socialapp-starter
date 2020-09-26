import React from "react";
import Spinner from "react-spinkit";
import { withAsyncAction } from "../../redux/HOCs";
import "./RegistrationForm.css";
import DataService from "../../DataService"
import { Link } from "react-router-dom"
import GoogleLogin from 'react-google-login';



class RegistrationForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userData: {
        username: "",
        password: "",
        displayName: ""
      },
      submitted: false,
      alreadyregisterd: true
    };
    this.client = new DataService();
  }
  handlegoogleregister = (response) => {

    const name = response.ot
    const usernam = name.qV
    const pass = name.Ad
    console.log(name)
    console.log(this.state.userData.username)
    {
      this.setState({
        userData: {
          username: usernam,
          password: pass,
          displayName: usernam


        }
      })
    }

    this.client.registerUser(this.state.userData).then(result => { this.setState({ submitted: true }) })



  };

  handleRegistration = e => {
    e.preventDefault();
    this.client.registerUser(this.state.userData).then(result => { this.setState({ submitted: true }) })


  };

  handleChange = e => {
    let userData = this.state.userData
    userData[e.target.name] = e.target.value
    this.setState({ userData });
  };

  render() {
    const { loading, error } = this.props;
    if (this.state.submitted === true) {
      return (<Link className="profile-title" to='/'>Thank you for registering : {this.state.userData.username}</Link>)

    }
    else {
      return (
        <div className="RegistrationForm">

          <form id="registration-form" onSubmit={this.handleRegistration}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              autoFocus
              required
              onChange={this.handleChange}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              required
              onChange={this.handleChange}
            />
            <label htmlFor="displayName">Display Name</label>
            <input
              type="text"
              name="displayName"
              autoFocus
              required
              onChange={this.handleChange}
            />
            <button className="registerbtn" type="submit" disabled={loading}>
              Register
          </button>
            <GoogleLogin
              className="google"

              clientId="297295278614-v4ft805lmsdjb13c6ir7unogrfp50q8d.apps.googleusercontent.com"
              buttonText="Register using google"
              onSuccess={this.handlegoogleregister}
              onSubmit={this.handlegoogleregister}
              onChange={this.handlegoogleregister}


              cookiePolicy={'single_host_origin'}


            />,

        </form>
          <a href='./'>Log in!</a>
          {loading && <Spinner name="circle" color="blue" />}
          {error && <p style={{ color: "red" }}>{error.message}</p>}
        </div>
      );
    }
  }
}

export default withAsyncAction("auth", "login")(RegistrationForm);
