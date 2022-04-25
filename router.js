const router = {};

const use = {
  __global: [],
  __globalLast: null
};

Object.defineProperty(use, '__globalLast', {
  get() {
    const globalLength = use['__global'].length
    return use['__global'][globalLength - 1]
  }
})

exports.use = (key, cb) => {
  if(typeof key === 'function') return use.__global.push(key);
  use[key] = cb;
}

exports.on = (key, cb) => router[key] = cb;

exports.run = (key, res, ws, req, wss) => {
  let _continue = false;
  const next = () => _continue = true;
  for(let _use of use.__global) {
    _use(res, ws, req, wss, next);
    if (!_continue) break;
    if(_use !== use.__globalLast)_continue = false;
  }
  if(!use.__global.length) _continue = true;
  if(!_continue) return;
  if(use[key]) {
    _continue = false;
    use[key](res, ws, req, wss, next);
  } 
  if(!_continue) return;
  router[key] && router[key](res, ws, req, wss);
}
