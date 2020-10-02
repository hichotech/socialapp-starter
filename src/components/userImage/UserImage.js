import React from "react";
import DataService from "../../DataService"
import Spinner from "react-spinkit";
import { withAsyncAction } from "../../redux/HOCs";
import '../message/messages.css'
import { Card } from 'antd';



class UserImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

      user: {
      
        pictureLocation: "",
        about:''
      
      },
      

    }
    this.client = new DataService();
  }
 
  componentDidMount () {
    
    this.client.getpicture(this.state.finduser).then(response => {
      this.setState({
        user: response.data.user,
        
      })
      

    })
  }

  addDefaultSrc = e =>{
    e.target.src = 'https://sd.keepcalms.com/i-w600/no-profile-picture-but-trust-me-i-m-handsome.jpg'
  }

  

  render() {
    
    const { loading, error } = this.props;
    const about = this.state.user
    const userabout = about.about
    
    let userData = this.state.user
      const imageUrl = "https://socialapp-api.herokuapp.com" + userData.pictureLocation
   



    return (
      <div className="profilr-pic">

        
        <img className="user-img" onError={this.addDefaultSrc}  
            width={200}
            src={imageUrl}
            alt="user "
            
            
          />
            <Card 
         value={userabout}
        
         type="text"
         name="text"
         />
          

        
        
        
        



        {loading && <Spinner name="circle" color="blue" />}
        {error && <p style={{ color: "red" }}>{error.message}</p>}
      </div>
    );
  }

}

export default withAsyncAction("auth", "login")(UserImage);
