import React from "react";
import DataService from "../../DataService"
import { Link } from "react-router-dom"
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
      return this.client.deleteUser(authData.result.username)
      .then(result => 
        {this.setState({submitted: true})
        window.localStorage.removeItem('login') 
      })

}
calerlocalstorage(){
  return  window.location.reload().then(window.localStorage.removeItem('login')
  )


}
render () {
  if(this.state.submitted === true) {
    return (<Link className='resetpage' onClick={this.calerlocalstorage}>User Deleted</Link>)
    
    
  }
    return (
      
        <div className='DeleteUser'>
        
                <button type="text" 
                    // onSubmit={this.calerlocalstorage} 

                onClick={this.handleDelete} >Delete User</button>
            
        </div>
    )
    }
}

export default withAsyncAction("auth", "logout")(DeleteUser);



