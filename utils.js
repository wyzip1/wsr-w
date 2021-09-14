exports.getQuery = (url) => {
  const query = {};
  if(!url.includes('?')) return;
  const list = url.split('?')[1].split('&');
  for(let i of list){
    if(!i) continue;
    const key = i.split('=');
    const value = i.split('=');
    query[key] = value;
  }
  return query;
}