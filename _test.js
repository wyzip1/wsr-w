const webSocketServer = require('./index');
const server = new webSocketServer({port: 3000});

server.on('connection', (on, use) => {
  on('/test', (res, ws, req, wss) => {
    console.log(res);
    console.log(res.data.toString());
    ws.send('test')
  })
})