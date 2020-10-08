import React from "react";
import DataService from "../../DataService"
import Spinner from "react-spinkit";
import { withAsyncAction } from "../../redux/HOCs";
import { Input } from 'antd';



class UpdateUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {user :{

  password:"",
  about: "",
  displayName:""

    }}
    this.client = new DataService();
  }

 
  updateUser = e => {
    e.preventDefault();
    let message = this.state.user
   
    console.log(message.about)
    this.client.updateUser(message.about)
    this.setState({user:{
      about:"",
      
    }}
    )}


  handleChange = e => {
    let user = this.state.user
    user[e.target.name] = e.target.value
    this.setState({ user });

  };

  render() {
    const { loading, error } = this.props;
    const { TextArea } = Input;
  
    return (
      <div className="MessageForm">

        <form id="message-form" onSubmit={this.updateUser}>


          
            <TextArea rows={2}
            
            type="text"
            name="about"
            autoFocus
            required
            onChange={this.handleChange} />
          <br />

<button className='post-msj-btn' type="submit" disabled={loading}>
            update About
          </button>



        </form>



        {loading && <Spinner name="circle" color="blue" />}
        {error && <p style={{ color: "red" }}>{error.message}</p>}
      </div>
    );
  }

}

export default withAsyncAction("auth", "login")(UpdateUser);
