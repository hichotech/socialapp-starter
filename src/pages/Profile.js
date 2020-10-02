import React from "react";
import Menu from "../components/menu/Menu";
import { userIsAuthenticated } from "../redux/HOCs";
import PostMessage from "../components/message/PostMessage";
<<<<<<< HEAD
=======
import DataService from "../DataService";
>>>>>>> 869920b2b90c8a2b0f7377cfa1aec62851975698
import ProfileFeed from '../components/profileFeed/ProfileFeed'
import Userlist from "../components/userlist/Userslist";
import UserImage from '../components/userImage/UserImage'
class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayName: this.props.displayName
    }
    this.client = new DataService()
}
  render() {


    return (
      <div className="Profile">
        <Menu isAuthenticated={this.props.isAuthenticated} />
<<<<<<< HEAD

        <h2 className="profile-title">Profile</h2>
        <UserImage/>
        <br />
=======
        <h2 className="profile-title">Profile</h2>
        <h2 className="user-display">{this.state.displayName} </h2>
>>>>>>> 869920b2b90c8a2b0f7377cfa1aec62851975698
        <PostMessage />
        <br/>
        
        <Userlist />

        <ProfileFeed />
      </div>
    );
  }
}

export default userIsAuthenticated(Profile);
