const webSocket = require('ws');
const webSocketServer = webSocket.Server;
const router = require('./router');
const { getQuery } = require('./utils');

class CreateWS {
  constructor({ port }) {
    this.wss = new webSocketServer({ port }); 
  }

  on(key, cb) {
    this.wss.on(key, (ws, req) => {
      cb(router.on, router.use, ws);
      req.query = getQuery(req.url);
      let path = req.url.split('?')[0];
      router.run(path, { type: 'connect' }, ws, req, this.wss);
      ws.on('message', (data) => router.run(path, { type: 'msg', data }, ws, req, this.wss));
      ws.on('close', (data) => router.run(path, { type: 'close', data }, ws, req, this.wss));
      
    })
  }
}

module.exports = CreateWS;
