import { createContext, useCallback, useEffect, useState } from "react"
import { io } from "socket.io-client";
import Chat from "./Chat";
const socket = io('http://localhost:3000/')


export const ChatContext = createContext()

export default function ChatContainer() {
    const [msgsList, setMsgsList] = useState([])
    const [msg, setMsg] = useState([])
    const [room, setRoom] = useState('')
    const [userName, setUserName] = useState('Người dùng')


    useEffect(() => {
        socket.on('connect', () => {
            setMsgsList(prev => {
                return ([...prev, { msg: `You connected with socket id: ${socket.id}` }])
            })
        })
        socket.on('message', (msg, user) => {

            setMsgsList(prev => {
                console.log([...prev, { msg, user }])
                return ([...prev, { msg, user }])
            })
        })
    }, [setMsgsList])

    const sendMsg = useCallback(function (msg, user, room) {
        setMsg(prev => {
            if (prev.trim())
                socket.emit('message', msg, user, room)

            return ''
        })

        setMsgsList(prev => [...prev, { msg, user }])
    }, [setMsg, setMsgsList])

    const joinRoom = useCallback(function (room) {
        socket.emit('join-room', room)

    }, [setMsg, setMsgsList])


    const value = {
        msgsList, setMsgsList,
        msg, setMsg,
        userName, setUserName,
        room, setRoom,
        sendMsg, joinRoom
    }

    return <ChatContext.Provider value={value}>
        <Chat />
    </ChatContext.Provider>
}
