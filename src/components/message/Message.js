import React from 'react'
import './messages.css'
import DeleteMessage from '../deleteMessage/DeleteMessage'
import DataService from '../../DataService'

class Message extends React.Component {
constructor(props){
    super(props)
    this.client = new DataService()
}

handleDelete= (event) => {
    return this.client.deleteMessage(203)
}

    render() {
        
        return (
           
<div className="feedbox">
            <li className='messagesfeed'>
                 
               <div className="date"> At {new Date(this.props.createdAt).toDateString()},
                {this.props.username} posted:</div>
                <br />
                <div className="message-text">{this.props.text}</div>
                <div className="likes">&#128077;  : {this.props.likes.length}</div>
                
                <button onClick={() => this.handleDelete()}>Delete</button>


            </li></div>
            
        )
    }

}


export default Message 