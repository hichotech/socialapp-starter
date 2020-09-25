import React from 'react'
import DataService from '../../DataService'
import './messages.css'
import { Link } from "react-router-dom"



class Message extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            submitted: false,
            likeCount: this.props.likes.length,
            messageLikedId: 0
        }
        this.client = new DataService()
    }

    handleChange = (event) => {
        console.log(this.props.id)


        this.client.deleteMessages(this.props.id).then(result => { this.setState({ submitted: true }) })
        
    }

    handleLike = (event) => {
        
        this.setState({likeCount: this.state.likeCount + 1, messageLikedId: this.props.id})
        this.client.postLike(this.props.id)
        console.log(this.state.messageLikedId)
        
    }

    handleDislike = (event) => {
        console.log(this.props.likes)
        const username = this.client.getUsername()
        const likesArray = this.props.likes
        let index = 0
        while(index < likesArray.length) {
            console.log(username)
            console.log(likesArray[index].username)

            if(likesArray[index].username === username) {
                console.log(likesArray[index].id)
                this.client.deleteLike(likesArray[index].id)
            }
            index += 1
        }
       
    }

    checkLikeArray () {
        
    }

    render() {

        
        if (this.state.submitted) {
            return (<Link className='resetpage' to='/profile/:username'></Link>)

        }

        
       
        return (


            <div className="feedbox">


                <li className='messagesfeed'>
                    <button type="text" onClick={this.handleChange}>delete</button>

                    <div className="date"> At {new Date(this.props.createdAt).toDateString()},
                {this.props.username} posted:</div>
                    <br />
                    <div className="message-text">{this.props.text}</div>
                    <div className="likes">
                        <button className='likebutton' onClick={this.handleLike}>&#128077;</button>
                        <button className='dislikebutton' onClick={this.handleDislike}>dislike</button>
                : {this.state.likeCount}
                    </div>




                </li>
            </div>

        )
    }

}


export default Message 