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
    socket.on('join-room', (room) => {
        socket.join(room)
        console.log(`Client ${socket.id} joined room ${room}`)
        const size = io.sockets.adapter.rooms.get('123')?.size
        console.log(`Room 123 has ${size} clients`)

    })
    socket.on('disconnect', () => {
        console.log(`Client ${socket.id} disconnected`)
        const size = io.sockets.adapter.rooms.get('123')?.size
        console.log(`Room 123 has ${size} clients`)
    })
})





io.listen(3000)

