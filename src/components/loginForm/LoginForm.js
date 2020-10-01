import React from "react";
import Spinner from "react-spinkit";
import { withAsyncAction } from "../../redux/HOCs";
import "./LoginForm.css";
import GoogleLogin from 'react-google-login';



class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",


    };
  }


  handleLogin = e => {
    e.preventDefault();
    this.props.login(this.state);
  };
  handlegoogleLogin = (response) => {

    const name = response.ot
    const usernam = name.qV
    const pass = name.Ad
    console.log(response)
    console.log(this.state.username)

    // this.state.username = usernam
    // this.state.password = pass
    {
      this.setState({
        username: usernam,
        password: pass
      })
    }

    this.props.login(this.state);

  };


  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });


  };

  render() {
    const responseGoogle = (response) => {
      console.log(response);
    }
    const { loading, error } = this.props;


    return (


      <div className="LoginForm">
        <h2>Log into Jargah</h2>
        <form id="login-form" onSubmit={this.handleLogin}>
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
          <button className="login-btn" type="submit" disabled={loading}>
            Login
          </button>
          <GoogleLogin

            clientId="297295278614-v4ft805lmsdjb13c6ir7unogrfp50q8d.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.handlegoogleLogin}
            onSubmit={this.handleLogin}
            onChange={this.handlegoogleLogin}
            cookiePolicy={'single_host_origin'}


          />,

        </form>

        <a href='./Registration'>Register Here</a>
        {loading && <Spinner name="circle" color="blue" />}
        {error && <p style={{ color: "red" }}>{error.message}</p>}
      </div>
    );
  }
}

export default withAsyncAction("auth", "login")(LoginForm);
