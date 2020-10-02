import axios from 'axios';
import { store } from "../src/redux"

class DataService {
    constructor(url = 'https://socialapp-api.herokuapp.com', client = axios.create()) {
        this.url = url;
        this.client = client;
    }

    uploadImg(image) {
        let authData = JSON.parse(localStorage.getItem('login'))
        return this.client.patch(this.url + "/users/" + (authData.result.username), { aboutpictureLocation: image }, {
            headers: {
                Authorization: `Bearer ${authData.result.token}`,
                'Content-Type': 'application/json'
            }
        });

    }
    googleLogin(registrationData) {
        return this.client.post(this.url + "auth/google/login", registrationData);
    }
    registerUser(registrationData) {
        return this.client.post(this.url + "/users", registrationData);
    }

    postMessage(message) {
        let authData = JSON.parse(localStorage.getItem('login'))
        return this.client.post(this.url + "/messages", { text: message }, {
            headers: {
                Authorization: `Bearer ${authData.result.token}`,
                'Content-Type': 'application/json'
            }
        });
    }


    postLike(messageId) {
        let authData = JSON.parse(localStorage.getItem('login'))
        return this.client.post(this.url + "/likes", { messageId: messageId }, {
            headers: {
                Authorization: `Bearer ${authData.result.token}`,
                'Content-Type': 'application/json'
            }

        }).then(console.log(this.state))
            ;

    }

    deleteLike(likeId) {
        let authData = JSON.parse(localStorage.getItem('login'))
        return this.client.delete(this.url + "/likes/" + likeId, {
            headers: {
                Authorization: `Bearer ${authData.result.token}`,
                'Content-Type': 'application/json'


            }
        });
    }



    deleteMessages(id) {
        let authData = JSON.parse(localStorage.getItem('login'))
        return this.client.delete(this.url + "/messages/" + id, {
            headers: {
                Authorization: `Bearer ${authData.result.token}`,
                'Content-Type': 'application/json'
            }
        });



    }
    getpicture(id) {
        let authData = JSON.parse(localStorage.getItem('login'))
        return this.client.get(this.url + "/users/" + (authData.result.username), {
            headers: {
                Authorization: `Bearer ${authData.result.token}`,
                'Content-Type': 'application/json'
            }
        });
    }



    getuser(username) {

        return this.client.get(`${this.url}/users/` + username)
    }
    updateUser(message) {
        let authData = JSON.parse(localStorage.getItem('login'))
        return this.client.patch(this.url + "/users/" + (authData.result.username), { about: message }, {
            headers: {
                Authorization: `Bearer ${authData.result.token}`,
                'Content-Type': 'application/json'
            }
        });
    }



    getFeed(limit = 20) {

        return this.client.get(`${this.url}/messages?limit=${limit}`)
    }

    getProfileFeed(username, limit = 20) {

        return this.client.get(`${this.url}/messages?username=${username}&limit=${limit}`)
    }
    getuserlist(limit = 15) {
        return this.client.get(`${this.url}/users?limit=${limit}`)
    }

    getUsername() {
        const { username } = store.getState().auth.login.result

        return username
    }


    deleteUser(username) {
        let authData = JSON.parse(localStorage.getItem('login'))
        return this.client.delete(this.url + "/users/" + username, {
            headers: {
                Authorization: `Bearer ${authData.result.token}`,
                'Content-Type': 'application/json'
            }
        });
    }

    getToken() {
        const { token } = JSON.parse(localStorage.getItem("login")).result.token
        return token
    }

    uploadPicture(formData) {
        let authData = JSON.parse(localStorage.getItem('login'))
        const url = this.url + `/users/${this.getUsername()}/picture`
        const config = {
            headers: {
                Authorization: `Bearer ${authData.result.token}`,
                'Content-Type': 'multipart/form-data'

            }
        }
       return this.client.put(url, formData, config)
    }
}
export default DataService;
