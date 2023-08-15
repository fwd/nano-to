export async function onRequestGet(ctx) {

  let url = new URL(ctx.request.url);

  async function gatherResponse(res) {
    const { headers } = res;
    const contentType = headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      return JSON.stringify(await res.json());
    }
    return res.text();
  }

  const init = {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  };

  const json = await fetch('https://raw.githubusercontent.com/fwd/nano-to/master/known.json', init);
  
  let results = await gatherResponse(json);
  
  // Nault.cc needs all names lowercase
  results = JSON.parse(results).map(a => {
    a.name = a.name.toLowerCase()
    return a
  })
  
  let name = url.searchParams.get('names');
      name = name ? name.replace('@', '') : ''

  const response = Response.json({ names: results.filter(a => a.name.toLowerCase() === name.toLowerCase() || a.address === name) });
  
  response.headers.set('Access-Control-Allow-Origin', '*');
  
  return response;

}
