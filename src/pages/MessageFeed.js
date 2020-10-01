import React from "react";
import DataService from '../DataService'
import Menu from '../components/menu/Menu'
import Message from '../components/message/Message'
import PostMessage from '../components/message/PostMessage'
import { userIsAuthenticated } from "../redux/HOCs";
import IntervalExample from '../components/setInterval/SetInterval'


class MessageFeed extends React.Component {
    state = {
        messages: [],
        refresh: false
    }
    client = new DataService ()
    
    componentDidMount () {
       

            this.client.getFeed().then(response => 
                this.setState({ messages: response.data.messages})
                )
       
        
    }
    
   
    
    
    render () {
        return (
            
            <div className='messagefeed'>
                
        
                               
                               <Menu isAuthenticated={this.props.isAuthenticated} />
                
                                <br />


                
                <br />
                <h2 className='profile-title'>Message Feed</h2>
                <PostMessage />
                <a className="back-link-msjfeed" href='/profile/:username'>back to profile</a>
                
                <ul>
                    {this.state.messages.map(messageObject => (
                        <Message key={messageObject.id} {...messageObject} />
                        
                    ))}
                </ul>
                
         


            </div>
        )
    }
}

export default userIsAuthenticated(MessageFeed);