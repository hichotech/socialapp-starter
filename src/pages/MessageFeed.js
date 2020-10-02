import React from "react";
import DataService from '../DataService'
import Menu from '../components/menu/Menu'
import Message from '../components/message/Message'
import PostMessage from '../components/message/PostMessage'
import { userIsAuthenticated } from "../redux/HOCs";

class MessageFeed extends React.Component {
state = {messages: []}
client = new DataService ()

    intervalId
    componentDidMount() {
    this.getFeedData()
   
    
    }
    componentWillUnmount() {
        clearTimeout(this.intervalId)
    }
    getFeedData = () => {
        this.client.getFeed().then(response => {
            this.setState({ messages: response.data.messages })
            this.intervalId = setTimeout(this.getFeedData.bind(this), 200)
        }      )
    }
    render () {
        return (
            
            <div className='messagefeed'>
                
        
                               
                               <Menu isAuthenticated={this.props.isAuthenticated} />
                
                                <br />


                
                <br />
                <h2 className='profile-title'>Message Feed</h2>
                <PostMessage />
               
                
                <ul>
                    {this.state.messages.map(messageObject => (
                        <Message key={messageObject.id} feedType = 'messageFeed' {...messageObject} />
                        
                    ))}
                </ul>
                
         


            </div>
        )
    }
}

export default userIsAuthenticated(MessageFeed);