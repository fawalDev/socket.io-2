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
import { instrument } from '@socket.io/admin-ui';

// const httpServer = createServer();

const io = new IO.Server({
    cors: {
        origin: ['http://localhost:5173', 'https://admin.socket.io'],
        credentials: true,
    },
})



io.on('connection', socket => {
    socket.on('message', (msg, user, room) => {

        if (room)
            socket.to(room).emit('message', msg, user)
        else
            socket.broadcast.emit('message', msg, user)
        // socket.emit('message', msg, user)
    })
    socket.on('join-room', (room, cb) => {
        socket.join(room)
        // total clients in room
        const size = io.sockets.adapter.rooms.get('123')?.size
        cb(`Room 123 has ${size} clients`)
    })
    socket.on('disconnect', () => {
        console.log(`Client ${socket.id} disconnected`)
        const size = io.sockets.adapter.rooms.get('123')?.size
        console.log(`Room 123 has ${size} clients`)
    })
})

const userIo = io.of('/user');

userIo.on('connection', socket => {
    console.log(`User ${socket.id} connected to /user namespace ` + socket.userName)
})

userIo.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (token) {
        socket.userName = getUserNameFromToken(token);
    }
    else {
        next(new Error('Authentication error'));
    }
})

function getUserNameFromToken(token: any): string {
    // Giả sử token là một chuỗi JSON đã được mã hóa
    return token.userName || 'Anonymous';
}
instrument(io, {
    auth: false,
});

io.listen(3000)
