export async function onRequest(next) {
  const response = await next();
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Max-Age', '86400');
  return response;
};

// Respond to OPTIONS method
export async function onRequestOptions(next) {
// export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Max-Age': '86400',
    },
  });
};

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

  const _response = await fetch('https://nano.to/known.json', init);
  const results = await gatherResponse(_response);
  let name = url.searchParams.get('names');
      name = name ? name : ''

  // return new Response(, {
  //   status: 200,
  //   headers: {
  //     "content-type": "application/json;charset=UTF-8",
  //     // 'Set-Cookie': `cf_clearance=invalid; expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0; path=/; domain=.${domain}`,
  //   },
  // });

  // return new Response({ names: results }, {
  // return Response.json({ names: JSON.parse(results)[0] });
  return Response.json({ names: JSON.parse(results).filter(a => a.name.toLowerCase() === name.toLowerCase()) });

}
