import React from 'react'
import DataService from '../../DataService'
import './messages.css'
import { Link } from "react-router-dom"
import {
    LikeFilled ,DislikeFilled 
  } from '@ant-design/icons';


class Message extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            submitted: false,
            likeCount: this.props.likes.length,
            messageLikedId: 0,
            beenLiked: false,
            myUsername: ''
        }
        this.client = new DataService()
    }
    

    componentDidMount() {
        const isMyUsername = this.client.getUsername()
        this.setState({myUsername: isMyUsername})
        
        const username = this.client.getUsername()
        const likesArray = this.props.likes
        let index = 0
        while(index < likesArray.length) {
          

            if(likesArray[index].username === username) {
                this.setState({beenLiked: true})
                
            }
            index += 1
        }
       
        
        }


    handleChange = (event) => {
        console.log(this.props)


        this.client.deleteMessages(this.props.id).then(result => { this.setState({ submitted: true }) })
        
    }

    handleLike = (event) => {
        
        if(this.state.beenLiked) {
            return
        }
        this.setState({likeCount: this.state.likeCount + 1, messageLikedId: this.props.id, beenLiked: true})
        this.client.postLike(this.props.id)
        console.log(this.state.messageLikedId)
        
        
    }

    handleDislike = (event) => {

        if(!this.state.beenLiked){
            return
        }
        console.log(this.props.likes)
        const username = this.client.getUsername()
        const likesArray = this.props.likes
        console.log(likesArray.length)
        this.setState({likeCount: this.state.likeCount -1, beenLiked: false})
        let index = 0
        while(index < likesArray.length) {
            console.log(username)
            console.log(likesArray[index].username)

            if(likesArray[index].username === username) {
                console.log(likesArray[index].id)
                this.client.deleteLike(likesArray[index].id)
                this.setState({likeCount: this.state.likeCount -1, messageLikedId: this.props.id})
                
            }
            index += 1
        }
       
    }
   


    

    render() {

        
        if (this.state.submitted) {
            return (<Link className='resetpage' to='/profile/:username'></Link>)

        }

        if(this.props.username === this.state.myUsername && this.props.feedType === 'messageFeed'){
            return ( <div className="feedbox">


            <li className='messagesfeed'>
                

                <div className="date"> At {new Date(this.props.createdAt).toDateString()},
            {this.props.username} posted:</div>
                <br />
                <div className="message-text">{this.props.text}</div>
                <div className="likes">
                    {/* <button className='likebutton' onClick={this.handleLike}>&#128077;</button> */}
                    {/* <button className='dislikebutton' onClick={this.handleDislike}>dislike</button> */}
            Likes: {this.state.likeCount}
                </div>




            </li>
        </div>
           )
        }
        if(this.props.feedType === 'messageFeed' && this.state.beenLiked) {
           return ( <div className="feedbox">


            <li className='messagesfeed'>
                

                <div className="date"> At {new Date(this.props.createdAt).toDateString()},
            {this.props.username} posted:</div>
                <br />
                <div className="message-text">{this.props.text}</div>
                <div className="likes">
                    {/* <button className='likebutton' onClick={this.handleLike}>&#128077;</button> */}
                    <DislikeFilled className='dislikebutton' onClick={this.handleDislike}/>
            : {this.state.likeCount}
                </div>




            </li>
        </div>
           )
        }

        if(this.props.feedType === 'messageFeed' && !this.state.beenLiked) {
            return ( <div className="feedbox">
 
 
             <li className='messagesfeed'>
                 
 
                 <div className="date"> At {new Date(this.props.createdAt).toDateString()},
             {this.props.username} posted:</div>
                 <br />
                 <div className="message-text">{this.props.text}</div>
                 <div className="likes">
                 <LikeFilled  className='likebutton' onClick={this.handleLike}/>
                     {/* <button className='dislikebutton' onClick={this.handleDislike}>dislike</button> */}
             : {this.state.likeCount}
                 </div>
 
 
 
 
             </li>
         </div>
            )
         }
       if(this.props.feedType === 'profileFeed')
        return (


            <div className="feedbox">


                <li className='messagesfeed'>
                    <button type="text" onClick={this.handleChange}>delete</button>

                    <div className="date"> posted by : {this.props.username} on : {new Date(this.props.createdAt).toDateString()}
                 </div>
                    <br />
                    <div className="message-text">{this.props.text}</div>
                    <div className="likes">
                        {/* <button className='likebutton' onClick={this.handleLike}>&#128077;<span role="img" aria-label="h">&#128077;</span></button>
                        <button className='dislikebutton' onClick={this.handleDislike}>dislike</button> */}
               Likes : {this.state.likeCount}
                    </div>




                </li>
            </div>

        )
    }

}


export default Message 