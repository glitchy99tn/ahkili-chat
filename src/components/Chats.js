import React, { useRef,useState, useEffect} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";

import { useAuth } from "../contexts/AuthContext";


export default function Chats() {
    const didMountRef = useRef(false)
    const [loading, setLoading] = useState(true)
    const { user } = useAuth()
    const history = useHistory()
    
   
    async function handleLogout()  {
        await auth.signOut();

        history.push("/");
    }

    async function getFile(url) {
        let response = await fetch(url);
        let data = await response.blob();

        return new File ([data], "userPhoto.jpg", {type: "image/jpeg"});
    }

    useEffect(() => {
        if (!didMountRef.current){
            didMountRef.current = true
        }
        if(!user || user === null){
            history.push("/")

            return
        }

        axios.get( 
            'https://api.chatengine.io/users/me/', 
            { headers: {
                "project-id": '135eb13e-29b6-45c1-a481-7eb113f3b012',
                "user-name": user.email,
                "user-secret": user.uid
            }}
        
        )
        .then(() => {setLoading(false);

        })
        .catch(e => {
            let formdata = new FormData()
            formdata.append("email", user.email)
            formdata.append("username", user.email)
            formdata.append("secret", user.uid)

            getFile(user.photoURL)
                .then((avatar) => {
                    formdata.append("avatar", avatar, avatar.name)

                    axios.post(
                        'https://api.chatengine.io/users/',
                        formdata,
                        {headers: {"private-key": 'd97c7c1f-9ea3-495e-9967-c671c0b5ae78'}}
                    )

                    .then(() => setLoading(false))
                    .catch(e => console.log("e", e.response))
                })
        })

    }, [user, history]);

    if (!user || loading) return <div />

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Ahkili
                </div>

                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>

            </div>

            <ChatEngine 
                height="calc(100vh - 66px)"
                projectID= '135eb13e-29b6-45c1-a481-7eb113f3b012'
                userName={user.email}
                userSecret={user.uid}
            />

        </div>
    )
}
