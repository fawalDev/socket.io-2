import type { Server } from 'http'
import io from 'socket.io';


let IO: io.Server<io.DefaultEventsMap, io.DefaultEventsMap, io.DefaultEventsMap, any>

export function init(server: Server) {
    IO = new io.Server(server, {
        cors: {
            origin: '*',
            credentials: true
        }
    })

}

export function getIO() {
    return IO
}


