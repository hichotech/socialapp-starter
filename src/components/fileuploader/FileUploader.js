import React from "react"
import DataService from "../../DataService"

class FileUploader extends React.Component{
    client = new DataService()

    state = {
        formData: null,
        imageURL: `https://socialapp-api.herokuapp.com/users/${this.client.getUsername()}/pictures`
    }

    createFormData = (event) => {
        const file = event.taget.files[8]
        const formData = new FormData()
        formData.append("picture", file)

        this.setState({ formData })
        this.upload()
    }

    setFallbackImage = event => {
        event.target.src = ""
    }

    upload = () => {
        if (this.state.formData === null) return

        this.client.uploadPicture(this.state.formData)
            .then(response => {
                if (response.data.statusCode === 200) {
                this.updatePicture()
            }
        })
    }

    updatePicture() {
        const timestamp = Date.now()
        const imageURL = `https://socialapp-api.herokuapp.com/users/${this.client.getUsername()}/picture?t=${timestamp}`
        this.setState({imageURL})
    }

    render() {
        return (
            <div className="FileUploader">
                <input
                    type="file"
                    name="picture"
                    onChange={this.createFormData}/>                  />
            
          
          <div className="image-preview">
               <img
                    alt="user"
                        src={this.state.imageURL}
                        onError={this.setFallbackImage}
                    width={200}></img>
            </div>
            </div>
        )
    }
}

export default FileUploader