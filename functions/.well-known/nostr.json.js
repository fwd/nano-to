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

  var nostr_object = {}

  if (name) {
    results.filter(a => a.nostr_public_key && a.name.toLowerCase() === name.toLowerCase()).map(a => nostr_object[a.name] = a.nostr_public_key)
  } else {
    results.filter(a => a.nostr_public_key).map(a => nostr_object[a.name] = a.nostr_public_key)
  }

  const response = Response.json({ names: nostr_object });

  response.headers.set("Access-Control-Allow-Origin", "*")
  response.headers.set("Access-Control-Allow-Headers", "*")
  response.headers.set("Access-Control-Allow-Methods", "GET,HEAD,POST,OPTIONS")
  
  return response;

}
