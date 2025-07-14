import { createContext, useCallback, useEffect, useState } from "react"
import { io } from "socket.io-client";
import Chat from "./Chat";
const socket = io('http://localhost:3000/')


export const ChatContext = createContext()

export default function ChatContainer() {
    const [msgsList, setMsgsList] = useState([])
    const [msg, setMsg] = useState([])
    const [userName, setUserName] = useState('Người dùng')


    useEffect(() => {
        socket.on('connect', () => {
            setMsgs(prev => {
                return ([...prev, { msg: `You connected with socket id: ${socket.id}` }])
            })
        })
    }, [setMsgsList])

    const sendMsg = useCallback(function (msg, user) {
        socket.emit('message', msg, user)
    }, [])

    const value = {
        msgsList, setMsgsList,
        msg, setMsg,
        userName, setUserName,
        sendMsg
    }

    return <ChatContext.Provider value={value}>
        <Chat />
    </ChatContext.Provider>
}
