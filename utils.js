exports.getQuery = (url) => {
  const query = {};
  if(!url.includes('?')) return;
  const list = url.split('?')[1].split('&');
  for(let i of list){
    if(!i) continue;
    const key = i.split('=')[0];
    const value = i.split('=')[1];
    query[key] = value;
  }
  return query;
}
