import { useContext, useEffect, useRef } from "react"

import { ChatContext } from './ChatContainer'

export default function Chat() {
    const {
        msgsList,
        msg, setMsg,
        userName, setUserName,
        room, setRoom,
        sendMsg, joinRoom
    } = useContext(ChatContext)

    function submit(e) {
        e.preventDefault()
        sendMsg(msg, userName, room)
    }

    return (
        <>
            <div className="chat-container">
                <div className="chat-header">
                    <span className="status-indicator offline"></span>
                    Chat Room
                </div>

                <div className="join-section">
                    <h3>Tham gia phòng chat</h3>
                    <input type="text" className="join-input" placeholder="Nhập tên của bạn..." value={userName} onChange={e => setUserName(e.target.value)} />
                    <input type="text" className="join-input" placeholder="Nhập ID phòng..." value={room} onChange={e => setRoom(e.target.value)} />
                    <button className="join-btn" onClick={e => joinRoom(room)}>Tham gia phòng</button>
                </div>

                <div className="chat-messages">
                    <MsgsList msgs={msgsList} />
                </div>

                <div className="chat-input-section">
                    <form onSubmit={submit} className="chat-input-container">
                        <input type="text" className="chat-input" placeholder="Nhập tin nhắn..." value={msg} onChange={e => setMsg(e.target.value)} />
                        <button className="send-btn">Gửi</button>
                    </form>
                </div>
            </div>
        </>
    )
}



function MsgsList({ msgs }) {

    return msgs?.map((msg, index) =>
        <div className="message received" key={index}>
            <div className="message-info">{msg.user ?? ''}</div>
            <div className="message-content">{msg.msg ?? ''}</div>
        </div>
    )
}