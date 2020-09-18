import React from "react";
import DataService from "../../DataService"

class DeleteUser extends React.Component {
    constructor(props) {
      super(props)
     
      this.client = new DataService();
    }

    handleDelete = event => {
        let authData = JSON.parse(localStorage.getItem('login'))
      console.log(authData.result.username)
      
      return this.client.deleteUser(authData.result.username)
      };

  
render () {
    return (
        <div className='DeleteUser'>
        
                <button type="text" onClick={this.handleDelete}>Delete User</button>
            
        </div>
    )
    }
}

export default DeleteUser;



