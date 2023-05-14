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
  const name = url.searchParams.get('names');

  // return new Response(, {
  //   status: 200,
  //   headers: {
  //     "content-type": "application/json;charset=UTF-8",
  //     // 'Set-Cookie': `cf_clearance=invalid; expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0; path=/; domain=.${domain}`,
  //   },
  // });

  // return new Response({ names: results }, {
  return Response.json({ names: JSON.parse(results).filter(a => a.name.toLowerCase() === name.toLowerCase()) });

}
