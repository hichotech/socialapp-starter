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
            likeId: 0
        }
        this.client = new DataService()
    }


    handleChange = (event) => {
        console.log(this.props.id)


        this.client.deleteMessages(this.props.id).then(result => { this.setState({ submitted: true }) })
    }

    handleLike = (event) => {
        
        this.setState({likeCount: this.state.likeCount + 1})
        this.client.postLike(this.props.id)
        
    }

    handleDislike = (event) => {
        const likeId = this.props.likes[0]
        if(likeId === undefined) { return}
        console.log(this.props.likes)
        console.log(likeId.id)
        console.log(this.state.likeId)
        this.setState({likeCount: this.state.likeCount - 1})
        this.client.deleteLike(likeId.id)
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
                        <button className='dislikebutton' onClick={this.handleDislike}>&#128077;</button>
                : {this.state.likeCount}
                    </div>




                </li>
            </div>

        )
    }

}


export default Message 