const { create } = require('domain');
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
      req.query = getQuery(req.url);
      let path = req.url.split('?')[0];
      ws.on('message', (data) => router.run(path, { type: 'msg', data }, ws, req, this.wss));
      ws.on('close', (data) => router.run(path, { type: 'close', data }, ws, req, this.wss));
      cb(router.on, router.use);
    })
  }
}

module.exports = CreateWS;
