import React from 'react'
import DataService from '../../DataService'

class DeleteMessage extends React.Component {
    state = {message: ''}
    client = new DataService ()

    handleChange(id) {
        this.client.deleteMessage(id)
    }

    render() {
        return (
            <div className='deleteMessage'>

                <button className='deleteMessageButton' onClick={this.handleChange(this.props.id)}>Delete Message</button>
            </div>
        )
    }
}

export default DeleteMessage