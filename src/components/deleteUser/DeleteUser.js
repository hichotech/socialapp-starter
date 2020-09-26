import React from "react";
import DataService from "../../DataService"
import { Link } from "react-router-dom"
import Logout from '../../redux/stateReducers/auth/logout'
import { withAsyncAction } from "../../redux/HOCs";



class DeleteUser extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        submitted: false
    }
      this.client = new DataService();
    }

    handleDelete = event => {
        let authData = JSON.parse(localStorage.getItem('login'))
      console.log(authData.result.username)
      
      return this.client.deleteUser(authData.result.username).then(result => Logout() )
      
      };

  // {this.setState({submitted: true})}
render () {
  if(this.state.submitted === true) {
    return (<Link className='resetpage' to='/'>User Deleted</Link>)
    
  }
    return (
        <div className='DeleteUser'>
        
                <button type="text" onClick={this.handleDelete}>Delete User</button>
            
        </div>
    )
    }
}

export default withAsyncAction("auth", "logout")(DeleteUser);



