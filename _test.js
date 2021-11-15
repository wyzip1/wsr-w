const webSocketServer = require('./index');
const server = new webSocketServer({port: 3000});

server.on('connection', (on, use) => {

  use((res, ws, req, wss, next) => {
    if(res.type === 'connect'){
      return ws.send(req.query.name + '进入房间')
    }
    next();
  })
  on('/test', (res, ws, req, wss) => {
    res.content = res.data.toString();
    console.log(res);
    ws.send('你好, ' + req.query.name)
  })

  on('/test2', (res, ws, req, wss) => {
    res.content = res.data.toString();
    console.log(res);
    ws.send('你好, ' + req.query.name)
  })
})