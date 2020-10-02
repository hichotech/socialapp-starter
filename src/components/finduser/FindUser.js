import React from "react";
import DataService from "../../DataService"
import Spinner from "react-spinkit";
import { withAsyncAction } from "../../redux/HOCs";
import { Input } from 'antd';


class FindUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

      user: {
        about: "",
        createdAt: "",
        displayName: "",
        googleId: "",
        pictureLocation: "",
        updatedAt: "",
        username: "",
      },
      submitted: false

    }
    this.client = new DataService();
  }

  finduser = e => {
    e.preventDefault();

    this.client.getuser(this.state.finduser).then(response => {
      this.setState({
        user: response.data.user,
        submitted: true
      })

    })
  }



  handleChange = e => {

    this.setState({ [e.target.name]: e.target.value });

  };
  addDefaultSrc(ev){
    ev.target.src = 'https://w7.pngwing.com/pngs/247/564/png-transparent-computer-icons-user-profile-user-avatar-blue-heroes-electric-blue.png'
  }
  

  render() {
    const { loading, error } = this.props;
    const { TextArea } = Input;
    let userData = this.state.user
      const image = "https://socialapp-api.herokuapp.com" + userData.pictureLocation
   



    return (
      <div className="MessageForm">

        <form id="message-form" onSubmit={this.finduser}>


          <TextArea rows={2}
            defultvalue={this.state.about}
            type="text"
            name="finduser"
            autoFocus
            required
            onChange={this.handleChange} />


          <br />

          <button className='post-msj-btn' type="submit" disabled={loading}>
            Find user
          </button>
          <div>username : {userData.username}</div>
          <div>about : {userData.about} </div>
         profile picture :<img preview="boolean"
            width={200} onError={this.addDefaultSrc}
            src={image}
            alt="profile piture"
          />
          <div>createdAt: {userData.createdAt}</div>
          

        </form>
        
        
        



        {loading && <Spinner name="circle" color="blue" />}
        {error && <p style={{ color: "red" }}>{error.message}</p>}
      </div>
    );
  }

}

export default withAsyncAction("auth", "login")(FindUser);
