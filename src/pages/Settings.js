import React from 'react'
import Menu from "../components/menu/Menu";
import { userIsAuthenticated } from "../redux/HOCs";
import DeleteUser from '../components/deleteUser/DeleteUser'
import FindUser from '../components/finduser/FindUser'
import UpdateUser from '../components/updateuser/UpdateUser'
import Uploadimg from '../components/profilepicture/ProfilePicture'

class Settings extends React.Component {
  render() {
    return (
      <div className="Settings">
        <Menu isAuthenticated={this.props.isAuthenticated} />
        <h2 className="profile-title">Settings</h2>
        
       
        <FindUser />
        <br />
        <UpdateUser />
        <br />
        <Uploadimg />

        <DeleteUser />


    
      </div>
    );
  }
}

export default userIsAuthenticated(Settings);
