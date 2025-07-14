import { useContext } from "react"

import { ChatContext } from './ChatContainer'

export default function Chat() {
    const {
        msgsList,
        msg, setMsg,
        userName, setUserName,
        sendMsg
    } = useContext(ChatContext)

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
                    <input type="text" className="join-input" placeholder="Nhập ID phòng..." defaultValue="room-123" />
                    <button className="join-btn">Tham gia phòng</button>
                </div>

                <div className="chat-messages">
                    <MsgsList msgs={msgsList} />
                </div>

                <div className="chat-input-section">
                    <div className="chat-input-container">
                        <input type="text" className="chat-input" placeholder="Nhập tin nhắn..." value={msg} onChange={e => setMsg(e.target.value)} />
                        <button onClick={sendMsg} className="send-btn">Gửi</button>
                    </div>
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