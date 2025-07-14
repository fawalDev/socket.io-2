// import http from 'http'
// import { init, getIO } from './service/IO'

// const server = http.createServer()
// server.listen(3000, ()=> {
//     console.log('server in running in port 3000')
// })

// init(server)



import IO from 'socket.io';

const io = new IO.Server({
    cors: {
        origin: ['http://localhost:5173']
    }
})
// io

io.on('connection', socket => {
    console.log(socket.id)
    socket.emit('message', {
        user: 'me', msg: 'hello'
    })
    
    
})





io.listen(3000)

