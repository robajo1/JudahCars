const WebSocket = require('ws');

const server = new WebSocket.Server({port: 8080})

const client= []
server.on('connection',(socket) => {
    client.push(socket)

    socket.on('message',(message) => {

        client.forEach((client)=>{
            if(client.readyState === WebSocket.OPEN){
                client.send(message);
            }
        })
    })
    socket.on('close',()=>{
        client.splice(client.indexOf(socket),1)
    })
})

