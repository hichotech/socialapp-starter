import React from "react";
import DataService from '../../DataService'


import Message from '../message/Message'

class ProfileFeed extends React.Component {
state = {messages: []}
client = new DataService ()

intervalId
componentDidMount () {
    this.getFeedData()
    let authData = JSON.parse(localStorage.getItem('login'))
    this.client.getProfileFeed(authData.result.username, 5).then(response => {
        this.setState({ messages: response.data.messages})
        
    })
}
componentWillUnmount() {
    clearTimeout(this.intervalId)
}
getFeedData = () => {
    let authData = JSON.parse(localStorage.getItem('login'))
    this.client.getProfileFeed(authData.result.username, 5).then(response => {
        this.setState({ messages: response.data.messages})
    })
        this.intervalId = setTimeout(this.getFeedData.bind(this), 200)
         
}




    render () {
        return (
            <div className='profilefeed'>
                <h2 className='feedtitle'>My Feed</h2>
                <ul>
                {this.state.messages.map(messageObject => (
                        <Message key={messageObject.id} {...messageObject} />
                        
                        
                    ))}
                    
                   
                </ul>

            </div>
        )
    }
}

export default ProfileFeed