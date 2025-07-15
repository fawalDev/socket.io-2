// import http from 'http'
// import { init, getIO } from './service/IO'

// const server = http.createServer()
// server.listen(3000, ()=> {
//     console.log('server in running in port 3000')
// })

// init(server)



/*

io.emit() -> gửi đến tất cả client
io.to(socket.id).emit() -> gửi đến client cụ thể

socket.emit() -> gửi đến client hiện tại
socket.broadcast.emit() -> gửi đến tất cả client trừ client hiệ n tại

___ room
socket.to(room).emit() -> gửi đến tất cả client trong room trừ client hiện tại

*/


import IO from 'socket.io';

const io = new IO.Server({
    cors: {
        origin: ['http://localhost:5173']
    }
})
// io

io.on('connection', socket => {
    console.log(socket.id)
    socket.on('message', (msg, user, room) => {
        if (room)
            socket.to(room).emit('message', msg, user)
        else
            socket.broadcast.emit('message', msg, user)
        // socket.emit('message', msg, user)
    })
})





io.listen(3000)

