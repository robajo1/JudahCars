const WebSocket = require('ws');

const server = new WebSocket.Server({port: 8080})

const client= []
server.on('connection',(socket) => {
    console.log("client Connected")
    client.push(socket)

    socket.on('message',(message) => {

        console.log(`Recieved : ${message}`)
        client.forEach((client)=>{
            if(client.readyState === WebSocket.OPEN){
                client.send(message);
            }
        })
    })
    socket.on('close',()=>{
        console.log("Client Disconnected");
        client.splice(client.indexOf(socket),1)
    })
})
console.log("WebSocket server started on ws://localhost:8080")

//to run node src\MsgServer.cjs